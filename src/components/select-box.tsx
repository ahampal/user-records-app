import { Controller, Control } from 'react-hook-form';
import ReactSelect from 'react-select';

const selectColors = {
    primary: '#00564d',
    neutral0: '#282828',
    neutral20: 'white',
    neutral80: 'white',
    neutral90: '#282828',
    primary25: '#282828',
    primary50: '#282828',
    primary75: '#282828',
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
            />
        </>
    )
};

export default Select;