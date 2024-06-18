import React from 'react'
import NestedMenu from '@/components/shared/NestedMenu'
import ProfileModal from './ProfileModal'

const ManageProfiles = () => {
    return (
        <NestedMenu.SubMenu menuKey="profiles" title={'Profiles'}>
            <ProfileModal />
        </NestedMenu.SubMenu>
    )
}

export default React.memo(ManageProfiles)
