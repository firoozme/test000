'use client'
import { useId } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import Avatar from '@/components/ui/Avatar'
import { Form, FormItem } from '@/components/ui/Form'
import NumericInput from '@/components/shared/NumericInput'
import { countryList } from '@/constants/countries.constant'
import { components } from 'react-select'
import type { ControlProps, OptionProps } from 'react-select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'

type ProfileSchema = {
    firstName: string
    lastName: string
    gender: string
    email: string
    phoneNumber: string
    whatsapp: string
    country: string
    city: string
}

type CountryOption = {
    label: string
    dialCode: string
    value: string
}

type GenderOption = {
    label: string
    value: string
}

const { Control } = components

const genderOptions: GenderOption[] = [
    { label: 'مرد', value: 'male' },
    { label: 'زن', value: 'female' },
]

const validationSchema: ZodType<ProfileSchema> = z.object({
    firstName: z.string().min(1, { message: 'نام لازم است' }),
    lastName: z.string().min(1, { message: 'نام خانوادگی لازم است' }),
    gender: z.string().min(1, { message: 'لطفاً جنسیت را انتخاب کنید' }),
    email: z
        .string()
        .min(1, { message: 'ایمیل لازم است' })
        .email({ message: 'ایمیل نامعتبر است' }),
    phoneNumber: z
        .string()
        .min(1, { message: 'لطفاً شماره تلفن خود را وارد کنید' }),
    whatsapp: z
        .string()
        .min(1, { message: 'لطفاً شماره واتساپ خود را وارد کنید' }),
    country: z.string().min(1, { message: 'لطفاً کشور را انتخاب کنید' }),
    city: z.string().min(1, { message: 'شهر لازم است' }),
})

const CustomSelectOption = (
    props: OptionProps<CountryOption> & { variant: 'country' },
) => {
    return (
        <DefaultOption<CountryOption>
            {...props}
            customLabel={(data, label) => (
                <span className="flex items-center gap-2">
                    <Avatar
                        shape="circle"
                        size={20}
                        src={`/img/countries/${data.value}.png`}
                    />
                    <span>{label}</span>
                </span>
            )}
        />
    )
}

const CustomControl = ({ children, ...props }: ControlProps<CountryOption>) => {
    const selected = props.getValue()[0]
    return (
        <Control {...props}>
            {selected && (
                <Avatar
                    className="ltr:ml-4 rtl:mr-4"
                    shape="circle"
                    size={20}
                    src={`/img/countries/${selected.value}.png`}
                />
            )}
            {children}
        </Control>
    )
}

const SettingsProfile = () => {
    const genderSelectId = useId()
    const countrySelectId = useId()

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        control,
    } = useForm<ProfileSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            gender: '',
            email: '',
            phoneNumber: '',
            whatsapp: '',
            country: '',
            city: '',
        },
    })

    const onSubmit = async (values: ProfileSchema) => {
        console.log('Form Values:', values)
        // اینجا می‌توانید API call خود را انجام دهید
        // await apiUpdateProfile(values)
    }

    return (
        <>
            <h4 className="mb-8">اطلاعات شخصی</h4>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-2 gap-4">
                    <FormItem
                        label="نام"
                        invalid={Boolean(errors.firstName)}
                        errorMessage={errors.firstName?.message}
                    >
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="نام"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="نام خانوادگی"
                        invalid={Boolean(errors.lastName)}
                        errorMessage={errors.lastName?.message}
                    >
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="نام خانوادگی"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                </div>
                <FormItem
                    label="جنسیت"
                    invalid={Boolean(errors.gender)}
                    errorMessage={errors.gender?.message}
                >
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <Select<GenderOption>
                                instanceId={genderSelectId}
                                options={genderOptions}
                                {...field}
                                placeholder="جنسیت را انتخاب کنید"
                                value={genderOptions.find(
                                    (option) => option.value === field.value,
                                )}
                                onChange={(option) =>
                                    field.onChange(option?.value)
                                }
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="ایمیل"
                    invalid={Boolean(errors.email)}
                    errorMessage={errors.email?.message}
                >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="email"
                                autoComplete="off"
                                placeholder="ایمیل"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <div className="grid md:grid-cols-2 gap-4">
                    <FormItem
                        label="تلفن"
                        invalid={Boolean(errors.phoneNumber)}
                        errorMessage={errors.phoneNumber?.message}
                    >
                        <Controller
                            name="phoneNumber"
                            control={control}
                            render={({ field }) => (
                                <NumericInput
                                    autoComplete="off"
                                    placeholder="شماره تلفن"
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="شماره واتساپ"
                        invalid={Boolean(errors.whatsapp)}
                        errorMessage={errors.whatsapp?.message}
                    >
                        <Controller
                            name="whatsapp"
                            control={control}
                            render={({ field }) => (
                                <NumericInput
                                    autoComplete="off"
                                    placeholder="شماره واتساپ"
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                />
                            )}
                        />
                    </FormItem>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <FormItem
                        label="کشور"
                        invalid={Boolean(errors.country)}
                        errorMessage={errors.country?.message}
                    >
                        <Controller
                            name="country"
                            control={control}
                            render={({ field }) => (
                                <Select<CountryOption>
                                    instanceId={countrySelectId}
                                    options={countryList}
                                    {...field}
                                    components={{
                                        Option: (props) => (
                                            <CustomSelectOption
                                                variant="country"
                                                {...(props as OptionProps<CountryOption>)}
                                            />
                                        ),
                                        Control: CustomControl,
                                    }}
                                    placeholder="کشور را انتخاب کنید"
                                    value={countryList.filter(
                                        (option) => option.value === field.value,
                                    )}
                                    onChange={(option) =>
                                        field.onChange(option?.value)
                                    }
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="شهر"
                        invalid={Boolean(errors.city)}
                        errorMessage={errors.city?.message}
                    >
                        <Controller
                            name="city"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="شهر"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                </div>
                <div className="flex justify-end mt-6">
                    <Button
                        variant="solid"
                        type="submit"
                        loading={isSubmitting}
                    >
                        ذخیره
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default SettingsProfile 