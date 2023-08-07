import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CButton
} from '@coreui/react'
import { addDoc, Timestamp } from 'firebase/firestore';
import { useEffect } from 'react';
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form"
import Select from './select-box';
import userCollection from '../services/firebase.config'

type Props = {
    isOpen: boolean;
    isCreate: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    users: Record<string, User>;
    setUsers: React.Dispatch<React.SetStateAction<Record<string, User>>>;
}

const Dialog = ({ isOpen, setOpen, isCreate, users, setUsers }: Props) => {
    const { handleSubmit, control, register, getValues, resetField, watch, reset } = useForm<FormValues>()
    const watchCountry = watch("country")

    const renderTitle = () => isCreate ? 'Add User' : 'Update User';

    const renderSaveBtn = () => isCreate ? 'Create' : 'Update';

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
        const docRef = await addDoc(userCollection, newUser);
        users[docRef.id] = { ...newUser, id: docRef.id }
        setUsers(users)
        setOpen(false);
    }

    const closeBtn = () => {
        setOpen(false)
        reset()
    }
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