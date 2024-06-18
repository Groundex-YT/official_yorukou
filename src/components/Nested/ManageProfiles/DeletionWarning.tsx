import React from 'react'
import NestedMenu from '@/components/shared/NestedMenu'
import EditProfilesModal from './EditProfilesModal'
import DeletionWarningModal from './DeletionWarningModal'

const DeletionWarning = () => {
    return (
        <NestedMenu.SubMenu menuKey="delete-warning" title={'Deletion Warning'}>
            <DeletionWarningModal />
        </NestedMenu.SubMenu>
    )
}

export default DeletionWarning
