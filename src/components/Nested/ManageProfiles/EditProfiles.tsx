import React from 'react'
import NestedMenu from '@/components/shared/NestedMenu'
import EditProfilesModal from './EditProfilesModal'

const ManageProfiles = () => {
    return (
        <NestedMenu.SubMenu menuKey="edit-profile" title={'Edit Profile'}>
            <EditProfilesModal />
        </NestedMenu.SubMenu>
    )
}

export default React.memo(ManageProfiles)
