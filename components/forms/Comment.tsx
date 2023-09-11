
'use client'

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { commentValidations } from "@/lib/validations/thread";
import Image from "next/image";
import addCommentToThread from "@/lib/actions/threads.actions";
// import { createThread } from "@/lib/actions/threads.actions";



type Props = {
    threadId: any;
    currentUserId: any;
    currentUserImg: any;
}

export default function Comment({ threadId, currentUserId, currentUserImg }: Props) {


    const router = useRouter();
    const pathname = usePathname();

    const { organization } = useOrganization();

    const form = useForm < z.infer < typeof commentValidations >> ({
        resolver: zodResolver(commentValidations),
        defaultValues: {
            thread: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof commentValidations>) => {
        await addCommentToThread(threadId , values?.thread , JSON.parse(currentUserId),pathname);

        form.reset();
    };

    return (<>
        <Form {...form}>
            <form
                className='comment-form'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name='thread'
                    render={({ field }) => (
                        <FormItem className='flex w-full items-center gap-3'>
                            <FormLabel className='text-base-semibold text-light-2'>
                                <Image src={currentUserImg} alt="profile-Image" width={48} height={48} className="rounded-full object-cover" />
                            </FormLabel>
                            <FormControl className='border-none bg-transparent'>
                                <Input className="no-focus text-light-1 outline-none " placeholder="Comment..." type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit' className='comment-form_btn'>
                    Reply
                </Button>
            </form>
        </Form>

    </>)
}