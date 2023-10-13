import React, { useEffect, useState } from 'react'
import {
    Box,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
} from '@chakra-ui/react'
import MobileNumberVerify from '../features/user/MobileNumberVerify'
import AadhaarNumberVerify from '../features/user/AadhaarNumberVerify'
import Register from '../features/user/Register'
import { useNavigate } from 'react-router-dom'

const steps = [
    { title: 'Verify', description: 'Contact Number' },
    { title: 'Verify', description: 'Aaddhaar Number' },
    { title: 'Register', description: 'Register' },
]

const SteperInformation = () => {
    const [steperId, setSteperId] = useState(1);
    const [activeStep, setactiveStep] = useState(steperId)
    const [aadhaarObj, setAadhaarObj] = useState({})
    const [mobileNoSave, setMobileSave] = useState('')

    const sendId = (revidedId) => {
        setSteperId(revidedId)
    }
    const revicedIdAaddhar = (revidedId) => {
        setSteperId(revidedId)
    }
    const revicedIdRegister = (revidedId) => {
        setSteperId(revidedId)
    }

    const aaddhaarAllData = (data) => {
        setAadhaarObj(data)
    }

    const mobileAllData = (data) => {
        setMobileSave(data)
    }
    
    // const { activeStep } = useSteps({
    //     index: 1,
    //     count: steps.length,
    // })
    useEffect(() => {
        setactiveStep(steperId)
    }, [steperId])

    return (
        <>
            <Stepper index={activeStep} margin={'20px 120px'}>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator>
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                            />
                        </StepIndicator>

                        <Box flexShrink='0'>
                            <StepTitle>{step.title}</StepTitle>
                            <StepDescription>{step.description}</StepDescription>
                        </Box>

                        <StepSeparator />
                    </Step>
                ))}
            </Stepper>

            {activeStep == 1 ? <MobileNumberVerify sendId={sendId} mobileAllData={mobileAllData} /> : null}
            {activeStep == 2 ? <AadhaarNumberVerify  revicedIdAaddhar={revicedIdAaddhar} aaddhaarAllData={aaddhaarAllData} /> : null}
            {activeStep == 3 ? <Register revicedIdRegister={revicedIdRegister} mobileNoSave={mobileNoSave} aadhaarObj={aadhaarObj}  /> : null}
        </>
    )
}

export default SteperInformation