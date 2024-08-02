import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const MissionVision = () => {
    return (
        <div className='w-[40vw]'>
            <h1>Mission and Vision</h1>
            <form className="mt-4">
                <div className='gap-5'>
                    <div className=''>
                        {/* <Input
                            label='1. Company Vision'
                            id='aj'
                            name=''
                            value=''
                            onChange={() => null}
                            touched={false}
                            error={''}
                            // rows={5}
                            placeholder='To be a pacesetter in digital transformation and software solutions in West Africa by 2025.'
                        /> */}
                        <label htmlFor="" className='text-xs text-[#5A5B5F]'>1. Company Vision</label>
                        <textarea
                            id=''
                            rows={5}
                            placeholder=' To be a pacesetter in digital transformation and software solutions in West Africa by 2025'
                            className='scroll-hidden text-[13px] border font-light p-2 rounded-sm w-full focus:outline-none'
                        >

                        </textarea>
                    </div>

                    <div className='mt-5'>
                        <label htmlFor="" className='text-xs text-[#5A5B5F]'>  2. Company Mission</label>
                        <textarea
                            id=''
                            rows={5}
                            placeholder='Providing you with innovative software solutions that exceed your expectations.'
                            className='scroll-hidden text-[13px] border font-light p-2 rounded-sm w-full focus:outline-none'
                        >

                        </textarea>
                    </div>
                </div>
                <div className="mt-5 flex gap-4 items-center">
                    <Button
                        className='border border-primary text-primary px-10 shadow-none bg-white hover:bg-none hover:text-white'
                        type='button'
                    >Back</Button>
                    <Button
                        className='border'
                        type='button'
                    >Save & Continue</Button>
                </div>
            </form>
        </div>
    );
}

export default MissionVision;
