import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import BoardBandServiceContent from '../../features/boardband-service'
import DynamicTitle from '../../components/dynamic_title'

function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "BoardBand Service" }))
    }, [])


    return (
        <>
            <DynamicTitle pageTitle={"BoardBand Service"} />
            <BoardBandServiceContent />
        </>

    )
}

export default InternalPage