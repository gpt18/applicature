import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { DrawerDialog } from "./components/drawer-dialog";
import { DialogDescription, DialogHeader, DialogTitle } from "./components/ui/dialog";
import { DrawerDescription, DrawerHeader, DrawerTitle } from "./components/ui/drawer";
import JobApplicationForm, { jobWorkTypes, applicationStatus, jobTypes } from "./forms/job-application-from";
import { forwardRef, useEffect, useState } from "react";
import { ArrowDown, BriefcaseBusiness, CalendarDays, Clipboard, Copy, Eye, FileSymlink, FolderClosed, MapPin, Pencil, Plus, Search, SquareArrowUpRight } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./components/ui/sheet";
import { ScrollArea } from "./components/ui/scroll-area";
import { cn } from "./lib/utils";


function App() {
  const [Applications, setApplications] = useState([]);

  useEffect(() => {
    const myApplications = JSON.parse(localStorage.getItem('myApplications') || '[]')
      .sort((a: any, b: any) => new Date(b.appliedOn).getTime() - new Date(a.appliedOn).getTime());
    setApplications(myApplications);
  }, []);

  return (
    <>
      <div>
        <div className="flex px-5 py-2 md:px-10 md:py-4 border-b items-center justify-between">
          <h1 className="text-lg font-bold">Applicature</h1>
          <div className="flex items-center gap-1 md:gap-3">
            <div className="flex place-items-center gap-1">
              <Button variant={"ghost"} size={"icon"}><Search size={20} /></Button>
              <MyResourcesButton Trigger={<Button variant={"ghost"} size={"icon"}><FolderClosed size={20} /></Button>} />
            </div>
            <img alt="" className="size-10 object-fit rounded-full bg-slate-400" />
          </div>
        </div>
        <div className="">
          <div className="px-5 md:px-10 flex justify-between items-center py-3 sticky top-0 filter backdrop-blur-xl">
            <h1 className="text-2xl md:text-3xl font-light">My Applications</h1>
            <DrawerDialog
              Trigger={
                <Button size={"sm"} variant={"outline"}>Create New</Button>
              }
              DialogHeader={
                <DialogHeader>
                  <DialogTitle>New Application</DialogTitle>
                  <DialogDescription>
                    Add your new applied job application record here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
              }
              DrawerHeader={
                <DrawerHeader className="text-left">
                  <DrawerTitle>New Application</DrawerTitle>
                  <DrawerDescription>
                    Add your new applied job application record here. Click save when you're done.
                  </DrawerDescription>
                </DrawerHeader>
              }
              Content={
                <div className="md:max-w-[480px]">
                  <ScrollArea className="h-[500px] md:h-[400px] md:pr-4">
                    <JobApplicationForm className="p-4 pb-52 md:p-0 " />
                  </ScrollArea>
                </div>
              } />

          </div>
          {Applications?.length === 0 &&
            <div className="flex justify-center items-center flex-col text-center px-8 pt-52">
              <BriefcaseBusiness size={100} className="text-muted-foreground" />
              <span>
                No job applications found.
              </span>
              <span className="text-lg">
                Click on the <b>Create New</b> button to add a new job application.
              </span>
            </div>}
          <div className="px-5 md:px-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 md:gap-4 py-3">
            {Applications?.map((item, i) => (
              <ApplicationCard key={i} item={item} idx={i} viewBtn={true} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

interface ApplicationCardProps {
  item: any;
  idx?: number;
  viewBtn?: boolean;
}

const ApplicationCard = forwardRef<HTMLDivElement, ApplicationCardProps>(({ item, idx, viewBtn }, ref) => {
  return (
    <div ref={ref}>
      <Card>
        <CardContent className="p-0 flex flex-col justify-center rounded-lg">
          <div className="px-4">
            <div className="flex justify-between py-3">
              <div className="flex place-items-center gap-2">
                <span className="text-[10px] text-muted-foreground pr-1 border-r">
                  {jobTypes.find(jt => jt.value === item?.jobType)?.shortLabel}
                </span>
                {item?.timeline?.map((tml: any, i: number) => (
                  <Badge key={i} variant={"outline"} className="bg-yellow-50">{applicationStatus.find(st => tml?.status === st?.value)?.label}</Badge>
                ))}
              </div>
              <div className="text-muted-foreground text-sm flex items-center gap-2 divide-x">
                {typeof idx !== 'undefined' && <span>#{idx + 1}</span>}
                {item?.jobLink && <div className="pl-2" onClick={
                  () => window.open(item?.jobLink, '_blank')
                }>
                  <SquareArrowUpRight size={15} />
                </div>}
              </div>
            </div>
            <div className="flex gap-2.5 items-center">
              <div className="">
                <img src={item?.logo} onError={
                  (e: any) => {
                    e.target.onerror = null;
                    e.target.src = 'https://icons.veryicon.com/png/o/business/oa-attendance-icon/company-27.png';
                  }
                } alt="" className="max-h-10 max-w-10 object-fit" />
              </div>
              <div className="border-l pl-2.5 flex flex-col justify-center">
                <h1 className="text-lg font-bold line-clamp-1" title={item?.jobRole}>{item?.jobRole}</h1>
                <p className="text-xs">{item?.companyName}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 py-2 text-xs md:text-base">
              <div className="flex flex-col justify-center">
                <div className="flex gap-1 items-center">
                  <p className="text-gray-500"><BriefcaseBusiness size={15} /></p>
                  <p className="font-bold">{jobWorkTypes.find(jwt => item?.workType === jwt?.value)?.label || '-'}</p>
                </div>
                <div className="flex gap-1 items-center">
                  <p className="text-gray-500"><MapPin size={15} /></p>
                  <p className="font-bold line-clamp-1" title={item?.location}>{item?.location || '-'}</p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-end">
                <p>CTC</p>
                <p className="text-base md:text-lg font-bold">{item?.ctc > 0 ? `₹${item?.ctc > 99999 ? (item?.ctc / 100000).toFixed(1) : item?.ctc}LPA` : '-'}</p>
              </div>
            </div>
          </div>
          <div className="border-t flex justify-between px-4 py-2">
            <div className="text-xs md:text-sm text-gray-500">
              <span className="flex items-center">
                <CalendarDays size={15} className="mr-1 md:mr-2 text-gray-500" />
                {new Date(item?.appliedOn).toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
              </span>
            </div>
            {viewBtn && <DetailedView
              trigger={<Badge variant={"outline"} className="bg-white cursor-pointer"><Eye size={15} className="mr-1 md:mr-2 text-gray-500" />View</Badge>}
              item={item} />}
          </div>
        </CardContent>
      </Card>
    </div>
  )
})

interface DetailedViewProps {
  trigger: React.ReactNode;
  item: any;
  idx?: number;
}

const DetailedView = ({ item, trigger, idx }: DetailedViewProps) => {
  return (
    <DrawerDialog
      Trigger={
        trigger
      }
      DialogHeader={
        <DialogHeader>
          <DialogTitle>Detailed View</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
      }
      DrawerHeader={
        <DrawerHeader className="text-left">
          <DrawerTitle>Detailed View</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
      }
      Content={
        <div className="md:max-w-[500px]">
          <ScrollArea className="h-[500px] md:h-[400px] md:pr-4">
            <div className="grid gap-3 p-4 md:p-0">
              <ApplicationCard item={item} idx={idx} />
              <OtherDetialsCard item={item} />
            </div>
          </ScrollArea>
        </div>

      } />
  )
}

const OtherDetialsCard = ({ item }: { item: any }) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0 flex flex-col justify-center rounded-lg">
        <div className="flex border-b">
          <div className="w-2/3 p-4 border-r">
            <h4 className="text-muted-foreground text-sm font-semibold md:text-base uppercase">
              Other Details
            </h4>
            <div>
              <div className="py-2">

                <CopyTextViewer label="Job Link" text={item?.jobLink} asLink />
                <CopyTextViewer label="Domain" text={item?.domain} asLink />

              </div>
            </div>
          </div>
          <div className="w-1/3 p-4">
            <h4 className="text-muted-foreground text-sm font-semibold md:text-base uppercase">
              Timeline
            </h4>
            <div className="py-2">
              {item?.timeline?.map((tml: any, i: number) => (
                <div key={i} className="flex flex-col items-center">
                  <Badge variant={"outline"} className="w-fit bg-yellow-100 text-xs">{tml?.status}</Badge>
                  <span className="text-xs text-muted-foreground text-nowrap">{new Date(tml?.timestamp).toLocaleString()}</span>
                  <ArrowDown size={15} className="text-muted-foreground" />
                </div>
              ))}

              <div className="flex flex-col items-center cursor-pointer">
                <Badge variant={"outline"} className="w-fit bg-white text-xs border-dashed items-center flex gap-1 justify-center hover:bg-gray-100 py-2">
                  <Plus size={12} className="text-muted-foreground" />
                  Add more
                </Badge>
              </div>

            </div>
          </div>
        </div>
        <div className="p-4">
          <h4 className="text-muted-foreground text-sm font-semibold md:text-base uppercase">
            Job Description
          </h4>
          <div className="py-2">
            <div className="rounded-lg border p-2 text-sm md:text-base break-words max-h-[400px] overflow-y-scroll" style={{ scrollbarWidth: "none" }}>
              <div className="text-gray-700">
                <p>
                  On {new Date(item?.appliedOn).toLocaleDateString()}, you applied for a
                  <span className="font-semibold"> {item?.jobRole}</span> position at
                  <span className="font-semibold"> {item?.companyName}</span>, a
                  <span className="font-semibold"> {item?.jobType}</span> company located in
                  <span className="font-semibold"> {item?.location}</span>. The role offers a competitive CTC of
                  <span className="font-semibold"> ₹{(item?.ctc / 100000).toFixed(2)} LPA</span>.
                </p>
                <p>
                  As of the latest update on
                  <span className="font-semibold"> {new Date(item?.timeline[item?.timeline.length - 1].timestamp).toLocaleDateString()}</span>,
                  your application status is
                  <span className="font-semibold"> {item?.timeline[item?.timeline.length - 1].status}</span>.
                </p>
                <p>
                  For more details, you can visit the job profile
                  <a href={item?.jobLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline"> here</a>.
                </p>
                <p>
                  Job Description: <span className="italic">{item?.jd}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const CopyTextViewer = ({ label, text, asLink = false }: { label?: string, text: string, asLink?: boolean }) => {
  return (
    <div className="space-y-.5">
      {label && <span className="text-xs font-bold">{label}</span>}
      <div className="relative border rounded-lg flex">
        {asLink ? <a href={text} target="_blank" rel="noopener noreferrer" className="p-2 flex-1 text-sm overflow-scroll text-nowrap text-blue-500 hover:underline cursor-pointer"  style={{ scrollbarWidth: "none" }}>{text}</a>
          :
          <div className={cn("p-2 flex-1 text-sm overflow-scroll text-nowrap")} style={{ scrollbarWidth: "none" }}>{text}</div>
        }
        <div className="obsolute right-0 bg-gray-100 py-2 px-3 grid place-items-center rounded-e-lg">
          <Clipboard size={14} className="" />
        </div>
      </div>
    </div>
  )
}

interface MyResourcesButtonProps {
  Trigger: React.ReactNode;
}

const MyResourcesButton: React.FC<MyResourcesButtonProps> = ({ Trigger }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{Trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Upload Resume</SheetTitle>
          <SheetDescription>Upload your resume here. Click save when you're done.</SheetDescription>
        </SheetHeader>
        <MyResources />
      </SheetContent>
    </Sheet>
  )
}

const MyResources = () => {
  return (
    <div className="py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-light">My Resources</h1>
        <Button variant="ghost" size="icon"><Pencil size={16} className="text-muted-foreground cursor-pointer" /></Button>
      </div>
      <div className="py-4">
        <div className="border rounded-md flex p-2 gap-2">
          <FileSymlink size={20} className="m-auto text-muted-foreground" />
          <span className="text-sm flex-1 hover:underline cursor-pointer">Resume.pdf</span>
          <Clipboard size={20} className="m-auto text-muted-foreground cursor-pointer" />
        </div>
      </div>
    </div>
  )
}


export default App;