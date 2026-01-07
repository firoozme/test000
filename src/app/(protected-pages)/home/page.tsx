'use client';

import { useMemo } from 'react';
import Container from '@/components/shared/Container';
import Card from '@/components/ui/Card';
// import Badge from '@/components/ui/Badge';
import Table from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import {
    HiOutlineClipboardCheck,
    HiOutlineClock,
    HiOutlineCurrencyDollar,
    HiOutlineCalendar,
    HiOutlineArrowRight,
} from 'react-icons/hi';

const { Tr, Td, TBody, THead, Th } = Table;

type Consultation = {
    id: number;
    lawyerName: string;
    date: string;
    time: string;
    duration: number;
    status: 'pending' | 'completed' | 'cancelled';
};

const consultationStatusConfig: Record<
    Consultation['status'],
    {
        label: string;
        borderClass: string;
        textClass: string;
    }
> = {
    pending: {
        label: 'در انتظار',
        borderClass: 'border-amber-500',
        textClass: 'text-amber-600',
    },
    completed: {
        label: 'انجام شده',
        borderClass: 'border-emerald-500',
        textClass: 'text-emerald-600',
    },
    cancelled: {
        label: 'کنسل شده',
        borderClass: 'border-red-500',
        textClass: 'text-red-600',
    },
};

// Mock Data - Stats
const stats = {
    completedConsultations: 12,
    pendingConsultations: 3,
    totalSpent: 4500000,
};

// Mock Data - Recent Consultations
const recentConsultations: Consultation[] = [
    {
        id: 1,
        lawyerName: 'دکتر احمد محمدی',
        date: '1403/10/25',
        time: '10:00',
        duration: 30,
        status: 'pending',
    },
    {
        id: 2,
        lawyerName: 'دکتر فاطمه رضایی',
        date: '1403/10/24',
        time: '14:30',
        duration: 15,
        status: 'pending',
    },
    {
        id: 3,
        lawyerName: 'دکتر علی کریمی',
        date: '1403/10/20',
        time: '16:00',
        duration: 30,
        status: 'completed',
    },
    {
        id: 4,
        lawyerName: 'دکتر مریم احمدی',
        date: '1403/10/18',
        time: '09:00',
        duration: 15,
        status: 'completed',
    },
    {
        id: 5,
        lawyerName: 'دکتر حسین موسوی',
        date: '1403/10/15',
        time: '11:30',
        duration: 30,
        status: 'cancelled',
    },
];

// Format currency
const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان';
};

const DashboardPage = () => {
    const columns: ColumnDef<Consultation>[] = useMemo(
        () => [
            {
                accessorKey: 'lawyerName',
                header: 'نام وکیل',
                cell: (props) => {
                    const { lawyerName } = props.row.original;
                    return (
                        <span className="font-semibold text-slate-700">
                            {lawyerName}
                        </span>
                    );
                },
            },
            {
                accessorKey: 'date',
                header: 'تاریخ',
                cell: (props) => {
                    const { date } = props.row.original;
                    return <span dir="ltr">{date}</span>;
                },
            },
            {
                accessorKey: 'time',
                header: 'ساعت',
                cell: (props) => {
                    const { time } = props.row.original;
                    return <span dir="ltr">{time}</span>;
                },
            },
            {
                accessorKey: 'duration',
                header: 'مدت',
                cell: (props) => {
                    const { duration } = props.row.original;
                    return (
                        <span className="text-slate-600">{duration} دقیقه</span>
                    );
                },
            },
            {
                accessorKey: 'status',
                header: 'وضعیت',
                cell: (props) => {
                    const { status } = props.row.original;
                    const config = consultationStatusConfig[status];
                    return (
                        <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full border ${config.borderClass} ${config.textClass} text-sm font-medium`}
                        >
                            {config.label}
                        </span>
                    );
                },
            },
        ],
        []
    );

    const table = useReactTable({
        data: recentConsultations,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const statCards = [
        {
            title: 'مشاوره‌های انجام شده',
            value: stats.completedConsultations,
            unit: 'مشاوره',
            icon: <HiOutlineClipboardCheck className="w-6 h-6" />,
            borderColor: 'border-emerald-500',
            iconColor: 'text-emerald-600',
        },
        {
            title: 'مشاوره‌های در انتظار',
            value: stats.pendingConsultations,
            unit: 'مشاوره',
            icon: <HiOutlineClock className="w-6 h-6" />,
            borderColor: 'border-amber-500',
            iconColor: 'text-amber-600',
        },
        {
            title: 'مجموع پرداختی',
            value: formatCurrency(stats.totalSpent),
            unit: '',
            icon: <HiOutlineCurrencyDollar className="w-6 h-6" />,
            borderColor: 'border-blue-500',
            iconColor: 'text-blue-600',
        },
    ];

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8"
            dir="rtl"
        >
            <Container className="px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-slate-800 mb-2">
                            داشبورد
                        </h1>
                        <p className="text-slate-600">
                            خلاصه وضعیت حساب کاربری شما
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        {statCards.map((stat, index) => (
                            <Card
                                key={index}
                                className={`border-2 ${stat.borderColor}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`w-14 h-14 rounded-full border-2 ${stat.borderColor} flex items-center justify-center ${stat.iconColor}`}
                                    >
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 mb-1">
                                            {stat.title}
                                        </p>
                                        <p className="text-2xl font-bold text-slate-800">
                                            {stat.value}
                                            {stat.unit && (
                                                <span className="text-sm font-normal text-slate-500 mr-1">
                                                    {stat.unit}
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Upcoming Consultation Alert */}
                    {stats.pendingConsultations > 0 && (
                        <Card className="mb-6 border-2 border-primary">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center text-primary">
                                        <HiOutlineCalendar className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-800">
                                            جلسه بعدی شما
                                        </h3>
                                        <p className="text-slate-600">
                                            {recentConsultations[0].date} ساعت{' '}
                                            {recentConsultations[0].time} با{' '}
                                            {recentConsultations[0].lawyerName}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="solid"
                                    icon={<HiOutlineArrowRight />}
                                    iconAlignment="end"
                                >
                                    مشاهده جزئیات
                                </Button>
                            </div>
                        </Card>
                    )}

                    {/* Recent Consultations Table */}
                    <Card
                        header={{
                            content: (
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-slate-800">
                                        آخرین مشاوره‌ها
                                    </h2>
                                    <Button variant="plain" size="sm">
                                        مشاهده همه
                                    </Button>
                                </div>
                            ),
                            bordered: true,
                        }}
                    >
                        <div className="overflow-x-auto">
                            <Table hoverable>
                                <THead>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <Tr key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <Th
                                                    key={header.id}
                                                    colSpan={header.colSpan}
                                                    className="whitespace-nowrap"
                                                >
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                </Th>
                                            ))}
                                        </Tr>
                                    ))}
                                </THead>
                                <TBody>
                                    {table.getRowModel().rows.map((row) => (
                                        <Tr key={row.id}>
                                            {row.getVisibleCells().map((cell) => (
                                                <Td
                                                    key={cell.id}
                                                    className="whitespace-nowrap"
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </Td>
                                            ))}
                                        </Tr>
                                    ))}
                                </TBody>
                            </Table>
                        </div>
                    </Card>
                </div>
            </Container>
        </div>
    );
};

export default DashboardPage;