'use client';

import React from 'react';
import Container from '@/components/shared/Container';
import Card from '@/components/ui/Card';
import Progress from '@/components/ui/Progress';
import {
    HiOutlineMail,
    HiOutlineIdentification,
    HiOutlinePhone,
    HiOutlineChatAlt2,
    HiOutlineCheck,
    HiOutlineClock,
    HiOutlineInformationCircle,
} from 'react-icons/hi';

type VerificationStatus = 'verified' | 'pending';

type VerificationItem = {
    id: string;
    label: string;
    icon: React.ReactNode;
    status: VerificationStatus;
    value?: string;
};

const statusConfig: Record<
    VerificationStatus,
    {
        label: string;
        borderClass: string;
        textClass: string;
        icon: React.ReactNode;
    }
> = {
    verified: {
        label: 'تایید شده',
        borderClass: 'border-emerald-500',
        textClass: 'text-emerald-600',
        icon: <HiOutlineCheck className="w-4 h-4" />,
    },
    pending: {
        label: 'در انتظار',
        borderClass: 'border-amber-500',
        textClass: 'text-amber-600',
        icon: <HiOutlineClock className="w-4 h-4" />,
    },
};

const verificationItems: VerificationItem[] = [
    {
        id: 'email',
        label: 'ایمیل',
        icon: <HiOutlineMail className="w-6 h-6" />,
        status: 'verified',
        value: 'user@example.com',
    },
    {
        id: 'nationalId',
        label: 'کد ملی',
        icon: <HiOutlineIdentification className="w-6 h-6" />,
        status: 'pending',
        value: '۰۰۱۲۳۴۵۶۷۸',
    },
    {
        id: 'phone',
        label: 'تلفن',
        icon: <HiOutlinePhone className="w-6 h-6" />,
        status: 'verified',
        value: '۰۹۱۲۳۴۵۶۷۸۹',
    },
    {
        id: 'whatsapp',
        label: 'واتساپ',
        icon: <HiOutlineChatAlt2 className="w-6 h-6" />,
        status: 'pending',
    },
];

const VerificationPage = () => {
    const verifiedCount = verificationItems.filter(
        (item) => item.status === 'verified'
    ).length;
    const progressPercent = Math.round(
        (verifiedCount / verificationItems.length) * 100
    );

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8"
            dir="rtl"
        >
            <Container>
                <div className="max-w-3xl mx-auto px-4">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-slate-800 mb-2">
                            احراز هویت
                        </h1>
                        <p className="text-slate-600">
                            وضعیت تایید اطلاعات شما
                        </p>
                    </div>

                    {/* Progress Card */}
                    <Card className="mb-6 border border-slate-200">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800">
                                    پیشرفت احراز هویت
                                </h3>
                                <p className="text-sm text-slate-500">
                                    {verifiedCount} از {verificationItems.length} مورد تایید شده
                                </p>
                            </div>
                            <div className="text-2xl font-bold text-primary-600">
                                {progressPercent}%
                            </div>
                        </div>
                        <Progress percent={progressPercent} />
                    </Card>

                    {/* Verification Items */}
                    <Card className="border border-slate-200">
                        <h2 className="text-xl font-semibold text-slate-800 mb-6">
                            اطلاعات احراز هویت
                        </h2>

                        <div className="space-y-4">
                            {verificationItems.map((item) => {
                                const config = statusConfig[item.status];
                                
                                return (
                                    <div
                                        key={item.id}
                                        className={`flex items-center justify-between p-4 rounded-xl border-0 ${config.borderClass}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full border-0 border-slate-200 flex items-center justify-center text-slate-600">
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-slate-800">
                                                    {item.label}
                                                </h4>
                                                {item.value && (
                                                    <p className="text-sm text-slate-500 font-mono">
                                                        {item.value}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${config.borderClass}`}
                                        >
                                            <span className={config.textClass}>
                                                {config.icon}
                                            </span>
                                            <span className={`text-sm font-medium ${config.textClass}`}>
                                                {config.label}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Info Box */}
                    <Card className="mt-6 border-0 border-blue-300">
                        <div className="flex gap-3">
                            <HiOutlineInformationCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                            <p className="text-sm text-slate-600">
                                برای تکمیل فرآیند احراز هویت، لطفاً اطلاعات درخواستی را ارسال کنید.
                                تایید اطلاعات معمولاً تا ۲۴ ساعت زمان می‌برد.
                            </p>
                        </div>
                    </Card>
                </div>
            </Container>
        </div>
    );
};

export default VerificationPage;