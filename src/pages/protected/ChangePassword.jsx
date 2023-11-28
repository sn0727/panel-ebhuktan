import React, { useEffect, useState } from 'react'
import TitleCard from '../../components/Cards/TitleCard'
import InputText from '../../components/Input/InputText'
import { APIRequest, ApiUrl } from '../../utils/commanApiUrl';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import DynamicTitle from '../../components/dynamic_title';
import { setPageTitle } from '../../features/common/headerSlice';

export const ChangePassword = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false);
    const [oldShowPass, setOldShowPass] = useState('password')
    const [newShowPass, setNewShowPass] = useState('password')
    const [changePasswordObj, setChangePasswordObj] = useState(
        {
            email: '',
            oldPassword: '',
            newPassword: '',
        }
    );

    const updateFormValue = ({ updateType, value }) => {
        setChangePasswordObj({ ...changePasswordObj, [updateType]: value })
    }

    const updateProfileUser = () => {
        if (!changePasswordObj?.email) {
            toast.error('Email is a mandatory field.')
            return true;
        } if (!changePasswordObj?.oldPassword) {
            toast.error('Old password is a mandatory field.')
            return true;
        } if (!changePasswordObj?.newPassword) {
            toast.error('New password is a mandatory field.')
            return true;
        }
        setIsLoading(true)
        let config = {
            url: ApiUrl?.changePasswordSuperAdmin,
            method: 'post',
            body: {
                "email": changePasswordObj?.email,
                "oldPassword": changePasswordObj?.oldPassword,
                "password": changePasswordObj?.newPassword
            }
        }
        APIRequest(
            config,
            res => {
                toast.success(res?.message)
                setIsLoading(false)
                setTimeout(() => {
                    window.location.reload(true);
                }, 1500)

            },
            err => {
                toast.error(err?.message)
                setIsLoading(false)
            }
        )
    }

    const oldShowPasswordFun = () => {
        oldShowPass === "password" ? setOldShowPass("text") : setOldShowPass("password")
    }

    const newShowPasswordFun = () => {
        newShowPass === "password" ? setNewShowPass("text") : setNewShowPass("password")
    }

    useEffect(() => {
        dispatch(setPageTitle({ title: "Change Password" }))
    }, [])

    return (
        <>
            <DynamicTitle pageTitle={"Change Password"} />
            <TitleCard title={'Change Password'} topMargin="mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText labelTitle="Email" placeholder='Email' value={changePasswordObj?.email} updateType="email" updateFormValue={updateFormValue} />
                    <div className='relative'>
                        <InputText labelTitle="Old Password" type={oldShowPass} placeholder='Old Password' value={changePasswordObj?.oldPassword} updateType="oldPassword" updateFormValue={updateFormValue} />
                        {oldShowPass === "password" ? <AiOutlineEye onClick={oldShowPasswordFun} className='eye-icon' /> : <AiOutlineEyeInvisible onClick={oldShowPasswordFun} className='eye-icon' />}
                    </div>
                    <div className='relative'>
                        <InputText labelTitle="New Password" type={newShowPass} placeholder='New Password' value={changePasswordObj?.newPassword} updateType="newPassword" updateFormValue={updateFormValue} />
                        {newShowPass === "password" ? <AiOutlineEye onClick={newShowPasswordFun} className='eye-icon' /> : <AiOutlineEyeInvisible onClick={newShowPasswordFun} className='eye-icon' />}
                    </div>
                </div>
                <div className="mt-16">
                    <button type="submit" className="btn btn-primary float-right" onClick={updateProfileUser}>Save</button>
                </div>
                {isLoading ? document.body.classList.add('loading-indicator') : document.body.classList.remove('loading-indicator')}
            </TitleCard>
        </>
    )
}
