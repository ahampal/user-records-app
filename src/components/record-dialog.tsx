import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CButton
} from '@coreui/react'
import { addDoc, Timestamp, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form"
import Select from './select-box';
import userCollection from '../services/firebase.config'

type Props = {
    isOpen: boolean;
    updateUser?: UserWithRef;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    users: Record<string, UserWithRef>;
    setUsers: React.Dispatch<React.SetStateAction<Record<string, UserWithRef>>>;
}

const Dialog = ({ isOpen, setOpen, updateUser, users, setUsers }: Props) => {
    const { handleSubmit, control, register, getValues, resetField, watch, reset, setValue } = useForm<FormValues>()
    const watchCountry = watch("country")

    const renderTitle = () => !updateUser ? 'Add User' : 'Update User';

    const renderSaveBtn = () => !updateUser ? 'Create' : 'Update';

    const saveBtn = async (data: FormValues) => {
        const newUser = {
            name: data.user_name,
            birth_date: Timestamp.fromDate(data.birth_date),
            city: {
                value: data.city.value,
                label: data.city.label,
            },
            country: {
                value: data.country.value,
                label: data.country.label,
            }
        }
        if (!updateUser) {
            const docRef = await addDoc(userCollection, newUser);
            const doc = await getDoc(docRef);
            users[docRef.id] = { ...doc.data(), docRef: docRef.id }
        } else {
            await setDoc(updateUser.docRef, newUser)
            users[updateUser.docRef.id] = { ...newUser, docRef: updateUser.docRef }
        }
        setUsers(users)
        setOpen(false);
    }

    const closeBtn = () => {
        setOpen(false)
        reset()
    }

    useEffect(() => {
        if (updateUser?.name) setValue("user_name", updateUser.name)
        if (updateUser?.birth_date) setValue("birth_date", updateUser.birth_date.toDate())
        if (updateUser?.country) setValue("country", updateUser.country)
        if (updateUser?.city) setValue("city", updateUser.city)
    }, [setValue, updateUser])

    useEffect(() => {
        resetField("city", { keepDirty: false, keepTouched: false, keepError: false })
    }, [resetField, getValues, watchCountry])

    const renderCitySelect = () => {
        const country = getValues("country");

        const selectOptions = (countryCode: string) => {
            switch (countryCode) {
                case "CA":
                    return [
                        { value: "TO", label: "Toronto" },
                        { value: "OT", label: "City of Ottawa" }
                    ]
                case "US":
                    return [
                        { value: "LV", label: "City of Las Vegas" },
                        { value: "CH", label: "Chicago" }
                    ]
                default:
                    return []
            }
        }

        return (
            <>
                <label>City</label>
                <Select
                    options={selectOptions(country?.value)}
                    boxName="city"
                    control={control}
                />
            </>
        )
    }

    return (
        <>
            <CModal visible={isOpen} className='dialog' onClose={closeBtn}>
                <CModalBody>
                    <CModalHeader closeButton={false}>
                        <CModalTitle>{renderTitle()}</CModalTitle>
                    </CModalHeader>

                    <form onSubmit={handleSubmit(data => saveBtn(data))}>
                        <label>Name</label>
                        <input {...register("user_name", { required: true, minLength: 1 })} className="input" />

                        <label>Date of Birth</label>
                        <Controller
                            control={control}
                            name="birth_date"
                            render={({ field: { value, ...fieldProps } }) => (
                                <div onClick={(e) => { e.stopPropagation() }}>
                                    <ReactDatePicker
                                        {...fieldProps}
                                        className="input"
                                        selected={value}
                                    />
                                </div>
                            )}
                            rules={{ required: true }}
                        />

                        <label>Country</label>
                        <Select
                            options={[
                                { value: "CA", label: "Canada" },
                                { value: "US", label: "USA" },
                            ]}
                            boxName="country"
                            control={control}
                        />

                        {renderCitySelect()}

                        <CModalFooter>
                            <CButton color="secondary" onClick={closeBtn}>Close</CButton>
                            <CButton type="submit" color="dark" >{renderSaveBtn()}</CButton>
                        </CModalFooter>
                    </form>
                </CModalBody>
            </CModal>
        </>
    )
};

export default Dialog;