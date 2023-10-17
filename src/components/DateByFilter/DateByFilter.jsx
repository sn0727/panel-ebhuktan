import React, { useEffect, useState } from 'react'
import { Calendar, DateRangePicker } from 'react-date-range';
import { Button, ChakraProvider } from '@chakra-ui/react';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import { APIRequest } from '../../utils/commanApiUrl';
import moment from 'moment';

export const DateByFilter = ({ selectionRange, setSelectionRange, setCheck }) => {
    const [open, setOpen] = useState(false)

    const handleSelect = (ranges) => {
        setSelectionRange(ranges.selection);
        setOpen(false)
    };

    const handlerChangeState = () => {
        setOpen(!open)   
        setCheck(true)
    }
    return (
        <div className='setPosition-fd'>
            <ChakraProvider>
                <Button style={{ backgroundColor: '#2c427d' }} onClick={() => handlerChangeState()}>
                    <BsFillCalendarDateFill color='#fff' />
                </Button>
            </ChakraProvider>
            {
                open ? <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                    rangeColors={['#2c427d']}
                /> : null
            }


        </div>
    )
}
