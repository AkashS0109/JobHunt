import React from 'react'


//upto 5 19
export default function Footer() {
    return (
        <div>
            <footer className='border-t border-t-gray-200 py-10 bg-black text-white'>
                <div className='container mx-auto px-4'>
                    <div className='flex flex-col md:flex-grow justify-between items-center'>
                        <div className='mb-4 md:mb-8'>
                            <h2 className='text-xl font-bold'>JobConnect...</h2>
                            <p className='text-sm'>2024 Your Company All rights reversed.</p>
                        </div>
                        <div className='flex space-x-10 mt-4 md:mt-8'>
                            <a href='https://www.facebook.com/' className='hover:text-gray-400' aria-label="facebook">
                                <svg  xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#1877F2">
                                    <path d="M22.675 0h-21.35C.598 0 0 .598 0 1.326v21.348C0 23.402.598 24 1.326 24h11.495v-9.294H9.69v-3.622h3.131V8.413c0-3.1 1.894-4.789 4.659-4.789 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.796.714-1.796 1.76v2.307h3.591l-.468 3.622h-3.123V24h6.125C23.402 24 24 23.402 24 22.674V1.326C24 .598 23.402 0 22.675 0z" />
                                </svg>
                            </a>
                            <a href='https://x.com/' className='hover:text-gray-400' aria-label="facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#1DA1F2">
                                    <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.577 2.163-2.724-.951.564-2.005.974-3.127 1.195-.897-.956-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .385.045.76.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.423.725-.666 1.561-.666 2.475 0 1.708.869 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.062c0 2.385 1.693 4.374 3.946 4.828-.413.112-.849.171-1.296.171-.316 0-.626-.03-.928-.088.631 1.953 2.445 3.376 4.6 3.415-1.68 1.318-3.809 2.105-6.115 2.105-.398 0-.79-.023-1.175-.067 2.179 1.397 4.768 2.213 7.557 2.213 9.054 0 14.002-7.496 14.002-13.986 0-.213-.005-.425-.014-.636.962-.695 1.8-1.562 2.46-2.549z" />
                                </svg>
                            </a>
                            <a href='https://www.linkedin.com/' className='hover:text-gray-400' aria-label="facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#0A66C2">
                                    <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zm-13.85 20.44h-3.7V9h3.7v11.44zM6.6 7.53C5.37 7.53 4.4 6.55 4.4 5.33S5.37 3.13 6.6 3.13c1.23 0 2.2.97 2.2 2.2s-.97 2.2-2.2 2.2zm14.64 12.91h-3.7v-5.61c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.15 1.46-2.15 2.97v5.71h-3.7V9h3.55v1.56h.05c.49-.93 1.69-1.92 3.48-1.92 3.72 0 4.41 2.45 4.41 5.63v6.17z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
