import { useState, type ReactNode } from 'react';
import { Button } from '@nokgridcore/ui/button';
import { Divider } from '@nokgridcore/ui/divider';
import { Input } from '@nokgridcore/ui/input';
import { Option } from '@nokgridcore/ui/option';
import { Select } from '@nokgridcore/ui/select';
import { Tab } from '@nokgridcore/ui/tab';
import { TabGroup } from '@nokgridcore/ui/tab-group';
import { languages, settingsTabs, user } from '../data';
import type { Nav } from '../index';
import { AccountActions, Panel } from '../parts';
import { text } from '../text';

export function Settings({ nav }: { nav: Nav }) {
	const [tab, setTab] = useState(0);

	return (
		<div className='flex flex-col gap-layout-lg'>
			<header className='flex items-center justify-between'>
				<TabGroup role='tablist' aria-label='Settings' activeIndex={tab} onActiveIndexChange={setTab}>
					{settingsTabs.map((label, index) => (
						<Tab key={label} role='tab' aria-selected={tab === index} label={label} />
					))}
				</TabGroup>
				<AccountActions nav={nav} bell={false} />
			</header>

			{tab === 0 ?
				<Panel className='flex flex-col px-7 py-component-sm' aria-label='Account settings'>
					<Row title='Language' detail='Choose the language used across Draftwell.'>
						<div className='w-[240px] shrink-0'>
							<Select size='lg' label='Language' showLabel={false} defaultSelectedIndex={0}>
								{languages.map((language) => (
									<Option key={language} label={language} />
								))}
							</Select>
						</div>
					</Row>
					<Divider style={{ width: '100%' }} />
					<Row title='Promo code' detail='Have a code from a partner or school? Apply it here.'>
						<div className='flex items-center gap-component-sm'>
							<div className='w-[200px]'>
								<Input size='lg' label='Promo code' hideLabel placeholder='Enter code' />
							</div>
							<Button variant='secondary' size='md'>
								Apply
							</Button>
						</div>
					</Row>
					<Divider style={{ width: '100%' }} />
					<Row title='Email' detail={user.email}>
						<Button variant='secondary' size='md'>
							Request email change
						</Button>
					</Row>
					<Divider style={{ width: '100%' }} />
					<Row title='Billing' detail='You are on the Free plan.'>
						<Button variant='secondary' size='md' onClick={nav.upgrade}>
							Manage billing
						</Button>
					</Row>
					<Divider style={{ width: '100%' }} />
					<Row title='Delete account' detail='Permanently remove your resumes and data.'>
						<Button variant='destructive' size='md'>
							Delete account
						</Button>
					</Row>
				</Panel>
			:	<Panel className='p-7' aria-label={`${settingsTabs[tab]} settings`}>
					<p className='m-0 text-text-secondary' style={text['body-md']}>
						{settingsTabs[tab]} settings aren’t part of this block yet.
					</p>
				</Panel>
			}
		</div>
	);
}

function Row({ title, detail, children }: { title: string; detail: string; children: ReactNode }) {
	return (
		<div className='flex items-center gap-layout-lg py-5'>
			<div className='flex min-w-0 flex-1 flex-col gap-component-xs'>
				<h2 className='m-0 text-text-primary' style={text['label-lg']}>
					{title}
				</h2>
				<p className='m-0 text-text-secondary' style={text['body-sm']}>
					{detail}
				</p>
			</div>
			{children}
		</div>
	);
}
