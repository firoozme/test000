'use client';

import React, { useState } from 'react';
import Container from '@/components/shared/Container';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Switcher from '@/components/ui/Switcher';
import Radio from '@/components/ui/Radio';
import {
    HiOutlineLockClosed,
    HiOutlineBell,
    HiOutlineMail,
    HiOutlineDeviceMobile,
    HiOutlineChatAlt2,
    HiOutlineCollection,
    HiOutlineTag,
    HiOutlineCalendar,
    HiOutlineClock,
    HiOutlineEye,
    HiOutlineEyeOff,
} from 'react-icons/hi';

type ReminderType = 'email' | 'sms' | 'whatsapp' | 'all';

type NotificationSettings = {
    discounts: boolean;
    reminderOneDay: boolean;
    reminderSameDay: boolean;
    reminderOneHour: boolean;
    reminderFifteenMin: boolean;
    reminderOnTime: boolean;
};

const SettingsPage = () => {
    // Password State
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Notification Settings State
    const [notifications, setNotifications] = useState<NotificationSettings>({
        discounts: true,
        reminderOneDay: true,
        reminderSameDay: true,
        reminderOneHour: true,
        reminderFifteenMin: false,
        reminderOnTime: true,
    });

    // Reminder Type State
    const [reminderType, setReminderType] = useState<ReminderType>('all');

    const handleNotificationChange = (
        key: keyof NotificationSettings,
        checked: boolean
    ) => {
        setNotifications((prev) => ({
            ...prev,
            [key]: checked,
        }));
    };

    const handlePasswordSubmit = () => {
        console.log('Password change submitted');
    };

    // Password Toggle Icon Component
    const PasswordToggle = ({
        show,
        onToggle,
    }: {
        show: boolean;
        onToggle: () => void;
    }) => (
        <button
            type="button"
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
            onClick={onToggle}
        >
            {show ? (
                <HiOutlineEyeOff className="w-5 h-5" />
            ) : (
                <HiOutlineEye className="w-5 h-5" />
            )}
        </button>
    );

    const notificationItems = [
        {
            key: 'discounts' as const,
            label: 'تماس در مورد تخفیفات',
            description: 'دریافت اطلاعیه‌های تخفیف و پیشنهادات ویژه',
            icon: <HiOutlineTag className="w-5 h-5" />,
        },
        {
            key: 'reminderOneDay' as const,
            label: 'یادآوری جلسه یک روز قبل',
            description: '۲۴ ساعت قبل از جلسه',
            icon: <HiOutlineCalendar className="w-5 h-5" />,
        },
        {
            key: 'reminderSameDay' as const,
            label: 'یادآوری جلسه همان روز',
            description: 'صبح روز جلسه',
            icon: <HiOutlineCalendar className="w-5 h-5" />,
        },
        {
            key: 'reminderOneHour' as const,
            label: 'یادآوری جلسه یک ساعت قبل',
            description: '۶۰ دقیقه قبل از جلسه',
            icon: <HiOutlineClock className="w-5 h-5" />,
        },
        {
            key: 'reminderFifteenMin' as const,
            label: 'یادآوری جلسه یک ربع قبل',
            description: '۱۵ دقیقه قبل از جلسه',
            icon: <HiOutlineClock className="w-5 h-5" />,
        },
        {
            key: 'reminderOnTime' as const,
            label: 'یادآوری جلسه در زمان جلسه',
            description: 'در لحظه شروع جلسه',
            icon: <HiOutlineBell className="w-5 h-5" />,
        },
    ];

    const reminderTypeOptions = [
        {
            value: 'email' as const,
            label: 'ایمیل',
            icon: <HiOutlineMail className="w-5 h-5" />,
        },
        {
            value: 'sms' as const,
            label: 'پیامک',
            icon: <HiOutlineDeviceMobile className="w-5 h-5" />,
        },
        {
            value: 'whatsapp' as const,
            label: 'واتساپ',
            icon: <HiOutlineChatAlt2 className="w-5 h-5" />,
        },
        {
            value: 'all' as const,
            label: 'هر سه',
            icon: <HiOutlineCollection className="w-5 h-5" />,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8" dir="rtl">
            <Container className="px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-slate-800 mb-2">
                            تنظیمات
                        </h1>
                        <p className="text-slate-600">
                            مدیریت تنظیمات حساب کاربری
                        </p>
                    </div>

                    {/* Change Password Section */}
                    <Card
                        className="mb-6"
                        header={{
                            content: (
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600">
                                        <HiOutlineLockClosed className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-slate-800">
                                        تغییر رمز عبور
                                    </h2>
                                </div>
                            ),
                            bordered: true,
                        }}
                    >
                        <div className="space-y-4">
                            {/* Current Password */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    رمز عبور فعلی
                                </label>
                                <Input
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    placeholder="رمز عبور فعلی را وارد کنید"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    suffix={
                                        <PasswordToggle
                                            show={showCurrentPassword}
                                            onToggle={() => setShowCurrentPassword(!showCurrentPassword)}
                                        />
                                    }
                                />
                            </div>

                            {/* New Password */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    رمز عبور جدید
                                </label>
                                <Input
                                    type={showNewPassword ? 'text' : 'password'}
                                    placeholder="رمز عبور جدید را وارد کنید"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    suffix={
                                        <PasswordToggle
                                            show={showNewPassword}
                                            onToggle={() => setShowNewPassword(!showNewPassword)}
                                        />
                                    }
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    تکرار رمز عبور جدید
                                </label>
                                <Input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="رمز عبور جدید را مجدداً وارد کنید"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    suffix={
                                        <PasswordToggle
                                            show={showConfirmPassword}
                                            onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                                        />
                                    }
                                />
                            </div>

                            <Button
                                variant="solid"
                                icon={<HiOutlineLockClosed />}
                                onClick={handlePasswordSubmit}
                                disabled={!currentPassword || !newPassword || !confirmPassword}
                            >
                                تغییر رمز عبور
                            </Button>
                        </div>
                    </Card>

                    {/* Notifications Section */}
                    <Card
                        className="mb-6"
                        header={{
                            content: (
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600">
                                        <HiOutlineBell className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-slate-800">
                                        اعلانات
                                    </h2>
                                </div>
                            ),
                            bordered: true,
                        }}
                    >
                        <div className="space-y-3">
                            {notificationItems.map((item) => (
                                <div
                                    key={item.key}
                                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-colors ${
                                        notifications[item.key]
                                            ? 'border-primary'
                                            : 'border-slate-200'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={
                                                notifications[item.key]
                                                    ? 'text-primary'
                                                    : 'text-slate-500'
                                            }
                                        >
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-slate-800">
                                                {item.label}
                                            </h4>
                                            <p className="text-sm text-slate-500">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                    <Switcher
                                        checked={notifications[item.key]}
                                        onChange={(checked) =>
                                            handleNotificationChange(item.key, checked)
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Reminder Type Section */}
                    <Card
                        header={{
                            content: (
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-600">
                                        <HiOutlineDeviceMobile className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-slate-800">
                                        نوع یادآوری
                                    </h2>
                                </div>
                            ),
                            bordered: true,
                        }}
                        footer={{
                            content: (
                                <Button variant="solid" block size="lg">
                                    ذخیره تنظیمات
                                </Button>
                            ),
                            bordered: true,
                        }}
                    >
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {reminderTypeOptions.map((option) => {
                                const isSelected = reminderType === option.value;
                                return (
                                    <div
                                        key={option.value}
                                        onClick={() => setReminderType(option.value)}
                                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                                            isSelected
                                                ? 'border-primary'
                                                : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                    >
                                        <Radio
                                            name="reminderType"
                                            value={option.value}
                                            checked={isSelected}
                                            onChange={() => setReminderType(option.value)}
                                            className="hidden"
                                        />
                                        <div
                                            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${
                                                isSelected
                                                    ? 'border-primary text-primary'
                                                    : 'border-slate-200 text-slate-500'
                                            }`}
                                        >
                                            {option.icon}
                                        </div>
                                        <span
                                            className={`font-medium transition-colors ${
                                                isSelected
                                                    ? 'text-primary'
                                                    : 'text-slate-600'
                                            }`}
                                        >
                                            {option.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>
            </Container>
        </div>
    );
};

export default SettingsPage;