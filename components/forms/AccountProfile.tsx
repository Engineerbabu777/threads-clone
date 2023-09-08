
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userValidations } from '@/lib/validations/user';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import * as z from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Image from 'next/image';
import React ,{ useState } from 'react';
import { Textarea } from '../ui/textarea';
import { isBase64Image } from '@/lib/utils';
import {useUploadThing} from '@/lib/uploadthing';


type Props = {
    user: { id: string, ObjectId: string, username: string, name: string, bio: string, image: string, };
    btnTitle: string,
}

export default function AccountProfile({ user, btnTitle }: Props) {

    const [files , setFiles] = useState<File[]>([]);
    const {startUpload} = useUploadThing("media");

    const form = useForm({
        resolver: zodResolver(userValidations),
        defaultValues: {
            profile_photo: user?.image || '',
            name: user?.name || '',
            username: user?.username || '',
            bio: user?.bio || '',
        }
    });

    async function onSubmit(values: z.infer<typeof userValidations>) {
        const blob = values.photo_image;
        const hasImagedChanged = isBase64Image(blob);

        if(hasImagedChanged){
            const imgRes = await startUpload(files);

            if(imgRes && imgRes[0]?.fileUrl){
                values.profile_photo = imgRes[0]?.fileUrl;
            }
        }

        // UPDATE YOUR PROFILE!!

    }

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
        e.preventDefault();

        const fileReader = new FileReader();

        if(e.target.files && e.target.files.length > 0){
            const file = e.target.files[0];

            setFiles(Array.from(e.target.files));
            if(!file.type.includes('image')) return;

            fileReader.onload = async(event) => {
                const ImageDataUrl = event.target?.result?.toString() || '';
                fieldChange(ImageDataUrl);
            } 

            fileReader.readAsDataURL(file);
        }

    }


    return (<>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 justify-start">
                <FormField
                    control={form.control}
                    name="profile_photo"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-4">
                            <FormLabel className="account-form_image-label">
                                {field.value ? (<Image src={field?.value} alt={"profile photo"} width={96} height={96} priority className="rounded-full object-contain" />) : (
                                    <Image src={"/assets/profile.svg"} alt={"profile photo"} width={24} height={24} className="object-contain" />
                                )}
                            </FormLabel>
                            <FormControl className="flex-1 text-base-semibold text-gray-200">
                                <Input type="file" className="account-form_input-image" accept={'image/*'} placeholder="Upload an Image" onChange={(e) => handleImage(e, field.onChange)} />
                            </FormControl>

                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                            <FormLabel className="text-light-2 ">
                                Name
                            </FormLabel>
                            <FormControl className="flex-1 text-base-semibold text-gray-200">
                                <Input type="text" className="account-form_input no-focus" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="flex flex-col  gap-3 w-full">
                            <FormLabel className="text-light-2">
                                Username
                            </FormLabel>
                            <FormControl className="flex-1 text-base-semibold text-gray-200">
                                <Input type="text" className="account-form_input no-focus" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem className="flex flex-col  gap-3 w-full">
                            <FormLabel className="text-light-2 ">
                                Bio
                            </FormLabel>
                            <FormControl className="flex-1 text-base-semibold text-gray-200">
                                <Textarea rows={10} type="text" className="account-form_input no-focus" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-primary-500">Submit</Button>
            </form>
        </Form>

    </>)
}