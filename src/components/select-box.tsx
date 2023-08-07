import { Controller, Control } from 'react-hook-form';
import ReactSelect from 'react-select';

const selectColors = {
    primary: '#00564d',
    neutral0: '#363636',
    neutral20: 'white',
    neutral80: 'white',
    neutral90: '#363636',
    primary25: '#363636',
    primary50: '#363636',
    primary75: '#363636',
}

type Props = {
    options: Array<{
        value: string;
        label: string;
    }>;
    control: Control<FormValues, any>;
    boxName: keyof FormValues;
}

const Select = ({ options, control, boxName }: Props) => {
    return (
        <>
            <Controller
                render={({ field }) => (
                    <div onClick={(e) => { e.stopPropagation() }}>
                        <ReactSelect
                            {...field}
                            options={options}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    backgroundColor: 'transparent',
                                    borderColor: state.isFocused ? '#08977b' : 'white',
                                    outline: '0',
                                    marginBottom: '20px',
                                })
                            }}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    ...selectColors,
                                }
                            })}
                        />
                    </div>
                )}
                name={boxName}
                control={control}
                rules={{ required: true, minLength: 1 }}
            />
        </>
    )
};

export default Select;