'use client';

import { useMemo } from 'react';
import Container from '@/components/shared/Container';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';

const { Tr, Td, TBody, THead, Th } = Table;

type Consultation = {
    id: number;
    lawyerName: string;
    date: string;
    time: string;
    duration: number;
    status: 'pending' | 'completed' | 'cancelled';
};

const consultationStatusColor: Record<
    Consultation['status'],
    {
        label: string;
        dotClass: string;
        textClass: string;
    }
> = {
    pending: {
        label: 'در حال انتظار',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
    completed: {
        label: 'انجام شده',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    cancelled: {
        label: 'کنسل شده',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
};

// Mock Data
const mockConsultations: Consultation[] = [
    {
        id: 1,
        lawyerName: 'دکتر احمد محمدی',
        date: '1403/10/15',
        time: '10:00',
        duration: 30,
        status: 'completed',
    },
    {
        id: 2,
        lawyerName: 'دکتر فاطمه رضایی',
        date: '1403/10/18',
        time: '14:30',
        duration: 15,
        status: 'pending',
    },
    {
        id: 3,
        lawyerName: 'دکتر علی کریمی',
        date: '1403/10/12',
        time: '16:00',
        duration: 30,
        status: 'cancelled',
    },
    {
        id: 4,
        lawyerName: 'دکتر مریم احمدی',
        date: '1403/10/20',
        time: '09:00',
        duration: 15,
        status: 'pending',
    },
    {
        id: 5,
        lawyerName: 'دکتر حسین موسوی',
        date: '1403/10/10',
        time: '11:30',
        duration: 30,
        status: 'completed',
    },
];

const ConsultationsPage = () => {
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
                header: 'روز مشاوره',
                cell: (props) => {
                    const { date } = props.row.original;
                    return <span dir="ltr">{date}</span>;
                },
            },
            {
                accessorKey: 'time',
                header: 'ساعت مشاوره',
                cell: (props) => {
                    const { time } = props.row.original;
                    return <span dir="ltr">{time}</span>;
                },
            },
            {
                accessorKey: 'duration',
                header: 'مدت مشاوره',
                cell: (props) => {
                    const { duration } = props.row.original;
                    return (
                        <span className="text-slate-600">
                            {duration} دقیقه
                        </span>
                    );
                },
            },
            {
                accessorKey: 'status',
                header: 'وضعیت مشاوره',
                cell: (props) => {
                    const { status } = props.row.original;
                    return (
                        <div className="flex items-center">
                            <Badge
                                className={
                                    consultationStatusColor[status].dotClass
                                }
                            />
                            <span
                                className={`ml-2 rtl:mr-2 font-semibold ${consultationStatusColor[status].textClass}`}
                            >
                                {consultationStatusColor[status].label}
                            </span>
                        </div>
                    );
                },
            },
        ],
        []
    );

    const table = useReactTable({
        data: mockConsultations,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8" dir="rtl">
            <Container>
                <div className="max-w-6xl mx-auto px-4">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-slate-800 mb-2">
                            مشاوره‌ها
                        </h1>
                        <p className="text-slate-600">
                            لیست تمام مشاوره‌های شما با وکلا
                        </p>
                    </div>

                    <Card>
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-xl font-semibold">
                                لیست مشاوره‌ها
                            </h4>
                            <div className="flex items-center gap-4">
                                <Badge
                                    className="bg-emerald-500"
                                    content={`${mockConsultations.filter((c) => c.status === 'completed').length} انجام شده`}
                                />
                                <Badge
                                    className="bg-amber-500"
                                    content={`${mockConsultations.filter((c) => c.status === 'pending').length} در انتظار`}
                                />
                                <Badge
                                    className="bg-red-500"
                                    content={`${mockConsultations.filter((c) => c.status === 'cancelled').length} کنسل شده`}
                                />
                            </div>
                        </div>
                        <Table hoverable>
                            <THead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <Tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <Th
                                                    key={header.id}
                                                    colSpan={header.colSpan}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext()
                                                    )}
                                                </Th>
                                            );
                                        })}
                                    </Tr>
                                ))}
                            </THead>
                            <TBody>
                                {table.getRowModel().rows.map((row) => {
                                    return (
                                        <Tr key={row.id}>
                                            {row.getVisibleCells().map((cell) => {
                                                return (
                                                    <Td key={cell.id}>
                                                        {flexRender(
                                                            cell.column.columnDef
                                                                .cell,
                                                            cell.getContext()
                                                        )}
                                                    </Td>
                                                );
                                            })}
                                        </Tr>
                                    );
                                })}
                            </TBody>
                        </Table>
                    </Card>
                </div>
            </Container>
        </div>
    );
};

export default ConsultationsPage;