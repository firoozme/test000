import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {

    eslint: {
        ignoreDuringBuilds: true,  // این خط ESLint رو کاملاً در زمان build نادیده می‌گیره
      },
};

export default withNextIntl(nextConfig);
