import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

const AdminPage = () => {
    return <React.Fragment></React.Fragment>
}

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        redirect: {
            permanent: false,
            destination: '/admin/home',
        },
        props: {},
    }
}

AdminPage.getLayout = AdminPage

export default AdminPage
