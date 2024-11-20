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
import { fetchWithDigestAuth } from "@/app/api/proxy/route"; // Adjust the path as needed

const FormSchema = z.object({
  dateTime: z.date(),
})
type formSchemaType = z.infer<typeof FormSchema>
const camip = "http://admin:testingA!@";
const videoIp = "192.168.0.141";

const DatePicker = ({open,onClose}) => {
      // 1. Define your form.
    const form = useForm<formSchemaType>({
        resolver: zodResolver(FormSchema),
    })
 
    async function onSubmit(values: formSchemaType) {
        const startTime = encodeURIComponent(format(values.dateTime, "yyyy-MM-dd HH:mm:ss"));
        const endTime = encodeURIComponent(
          format(new Date(values.dateTime.getTime() + 5 * 60 * 1000), "yyyy-MM-dd HH:mm:ss")
        );
      
        //const apiURL = `http://192.168.0.141/cgi-bin/loadfile.cgi?action=startLoad&channel=1&startTime=${startTime}&endTime=${endTime}&subtype=0`;
      
        fetch(`/api/proxy?startTime=${startTime}&endTime=${endTime}`)
      }
    if(!open) return null
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
export default DatePicker;