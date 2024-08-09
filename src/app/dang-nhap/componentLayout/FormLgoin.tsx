"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HttpsSWR } from "@/https/httpsSWR";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    username: z.string().min(1, { message: "Tối thiểu 1 ký tự" }).max(50),
    password: z.string().min(1, { message: "Tối thiểu 1 ký tự" }).max(50),
});

export default function FormLogin() {
    const [alert, setAlert] = useState<{
        message: string;
        variant: "default" | "destructive";
    } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);
            const result = await HttpsSWR.post("/auth/login", values);
            if (result.statusCode === 200) {
                setAlert({
                    message: result.message,
                    variant: "default",
                });
                await HttpsSWR.post("/api", result, "http://localhost:3001");
                setTimeout(() => {
                    router.push("/");
                }, 1000);
            } else {
                setAlert({
                    message: result.message,
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-2 gap-2">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Tên người dùng của bạn"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Mật khẩu của bạn"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {alert && (
                    <Alert variant={alert.variant}>
                        <AlertDescription>{alert.message}</AlertDescription>
                    </Alert>
                )}

                <Button
                    disabled={isLoading ? true : false}
                    className="w-full"
                    type="submit"
                >
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        ""
                    )}
                    Đăng nhập
                </Button>
            </form>
        </Form>
    );
}
