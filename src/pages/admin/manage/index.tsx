import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

const AdminManagePage = () => {
    return <React.Fragment></React.Fragment>
}

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        redirect: {
            permanent: false,
            destination: '/admin/manage/anime',
        },
        props: {},
    }
}

AdminManagePage.getLayout = AdminManagePage

export default AdminManagePage
