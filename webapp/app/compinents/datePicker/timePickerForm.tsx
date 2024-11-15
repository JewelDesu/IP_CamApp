"use client"
import React from "react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormField,
    FormItem,
  } from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { TimePicker } from "./timePicker";

const FormSchema = z.object({
  dateTime: z.date(),
})
type formSchemaType = z.infer<typeof FormSchema>
const camip = "http://admin:admin@";
const videoIp = "1.1.1.1";

export default function DatePicker() {
      // 1. Define your form.
    const form = useForm<formSchemaType>({
        resolver: zodResolver(FormSchema),
    })
 
    function onSubmit(values: formSchemaType) {
        const startTime = values.dateTime;
        const endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + 5);

        const formattedStartTime = format(startTime, "yyyy-MM-dd HH:mm:ss");
        const formattedEndTime = format(endTime, "yyyy-MM-dd HH:mm:ss");
        const url = `${camip}${videoIp}/cgi-bin/loadfile.cgi?action=startLoad&channel=1&startTime=${encodeURIComponent(formattedStartTime)}&endTime=${encodeURIComponent(formattedEndTime)}&subtype=0`;
        console.log(values, null, 2)
        console.log("Constructed URL:", url); // For debugging

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                alert(xhr.response);
            }
        }
    xhr.open('get', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.send();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="dateTime"
                    render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "y-M-d HH:mm:ss") : <span>Pick a date</span>}
                            </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>date > new Date()}
                        initialFocus
                        />
                        <div className="p-3 border-t border-border">
                            <TimePicker setDate={field.onChange} date={field.value }/>
                        </div>
                        
                    </PopoverContent>
                        </Popover>
                    </FormItem>
                    )}
                />
            <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}