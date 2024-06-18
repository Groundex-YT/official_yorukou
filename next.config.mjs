/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            's4.anilist.co',
            'pub-92474f7785774e91a790e086dfa6b2ef.r2.dev',
            'res.cloudinary.com',
            'lh3.googleusercontent.com',
            'platform-lookaside.fbsbx.com',
            'i.ibb.co',
            'thumb.tapecontent.net',
            'emojis.slackmojis.com',
            'pic-bstarstatic.akamaized.net',
            'cdn.discordapp.com',
            'wallpapers.com',
            'img.flawlessfiles.com',
            'gogocdn.net',
            'media.kitsu.io',
            'simkl.in',
            'static.bunnycdn.ru',
            'kickassanime.am',
            'img.zorores.com',
        ],
        minimumCacheTTL: 604800, // a week,
    },
    reactStrictMode: true,
}

export default nextConfig
