'use client'

import { lazy, Suspense } from 'react'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
// import SettingsMenu from './SettingsMenu'
// import SettingMobileMenu from './SettingMobileMenu'
import Loading from '@/components/shared/Loading'
// import { useSettingsStore } from '../_store/settingsStore'

const SettingsProfile = lazy(() => import('./SettingsProfile'))
// const Security = lazy(() => import('./SettingsSecurity'))
// const Notification = lazy(() => import('./SettingsNotification'))
// const Billing = lazy(() => import('./SettingsBilling'))
// const Integration = lazy(() => import('./SettingIntegration'))

const Profile = () => {
    // const { currentView } = useSettingsStore()

    return (
        <AdaptiveCard className="h-full">
             <div className="flex flex-auto h-full">
                
                <div className="ltr:xl:pl-6 rtl:xl:pr-6 flex-1 py-2">
                    <Suspense
                        fallback={<Loading loading={true} className="w-full" />}
                    >
                        <SettingsProfile />
                    </Suspense>
                </div>
            </div> 
        </AdaptiveCard>
    )
}

export default Profile
