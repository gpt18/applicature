import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import axios from "axios";
import { CalendarIcon, LoaderCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

export const APPLICATION_STATUS = {
  NOT_APPLIED: "not-applied",
  APPLIED: "applied",
  INTERVIEW: "interview",
  REJECTED: "rejected",
  SELECTED: "selected",
  OFFERED: "offered",
  IN_PROGRESS: "in-progress",
};

const JOB_WORK_TYPE = {
  FULL_TIME: "full-time",
  PART_TIME: "part-time",
  CONTRACT: "contract",
  INTERNSHIP: "internship",
};

export const JOB_TYPE = {
  PRIVATE: "private",
  GOVERNMENT: "government",
};

export const jobTypes = [
  {
    label: "Private",
    shortLabel: "PVT",
    value: JOB_TYPE.PRIVATE,
  },
  {
    label: "Government",
    shortLabel: "GOVT",
    value: JOB_TYPE.GOVERNMENT,
  },
];

export const jobWorkTypes = [
  {
    label: "Full Time",
    value: JOB_WORK_TYPE.FULL_TIME,
  },
  {
    label: "Part Time",
    value: JOB_WORK_TYPE.PART_TIME,
  },
  {
    label: "Contract",
    value: JOB_WORK_TYPE.CONTRACT,
  },
  {
    label: "Internship",
    value: JOB_WORK_TYPE.INTERNSHIP,
  },
];

export const applicationStatus = [
  {
    label: "Not Applied",
    value: APPLICATION_STATUS.NOT_APPLIED,
  },
  {
    label: "Applied",
    value: APPLICATION_STATUS.APPLIED,
  },
  {
    label: "Interview",
    value: APPLICATION_STATUS.INTERVIEW,
  },
  {
    label: "Rejected",
    value: APPLICATION_STATUS.REJECTED,
  },
  {
    label: "Selected",
    value: APPLICATION_STATUS.SELECTED,
  },
  {
    label: "Offered",
    value: APPLICATION_STATUS.OFFERED,
  },
  {
    label: "In Progress",
    value: APPLICATION_STATUS.IN_PROGRESS,
  },
];

function JobApplicationForm({ className }: React.ComponentProps<"form">) {
  const [newJob, setNewJob] = useState({
    jobRole: "",
    workType: JOB_WORK_TYPE.FULL_TIME,
    location: "",
    ctc: 0,
    appliedOn: new Date().toISOString(),
    timeline: [
      {
        status: APPLICATION_STATUS.APPLIED,
        timestamp: new Date().toISOString(),
      },
    ],
    jobType: JOB_TYPE.PRIVATE,
    jobLink: "",
    domain: "",
    companyName: "",
    logo: "",
    createdAt: new Date().toISOString(),
    jd: "",
  });
  const [loadingCompanyCardPreview, setLoadingCompanyCardPreview] =
    useState(false);

  const validateForm = () => {
    return newJob?.jobRole !== "" || newJob?.companyName !== "";
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      let updatedApplications = JSON.parse(
        localStorage.getItem("myApplications") || "[]"
      );
      updatedApplications.push(newJob);
      localStorage.setItem(
        "myApplications",
        JSON.stringify(updatedApplications)
      );
      window.location.reload();
    } else {
      alert("Please fill all the fields");
    }
  };

  const handleInputChange = (e: any) => {
    setNewJob((prevJob) => ({
      ...prevJob,
      [e.target.name]: e.target.value,
    }));
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const getCompanyDetails = async ({ companyUrl }: { companyUrl: string }) => {
    if (!isValidUrl(companyUrl)) {
      alert("Please enter a valid Application Link URL including http/https");
      return;
    }

    let url = new URL(companyUrl).origin;

    setNewJob((prevJob) => ({
      ...prevJob,
      domain: url,
    }));

    try {
      setLoadingCompanyCardPreview(true);
      const res = await axios.get(`https://api.microlink.io/?url=${url}`);
      console.log("Company details:", res.data);
      setNewJob((prevJob) => ({
        ...prevJob,
        companyName: res.data?.data?.publisher,
        logo: res.data?.data?.logo?.url,
      }));
    } catch (error) {
      console.error("Error while fetching company details", error);
    } finally {
      setLoadingCompanyCardPreview(false);
    }
  };

  const getCompanyIconFromDomain = async ({ domain }: { domain: string }) => {
    if (!isValidUrl(domain)) {
      alert("Please enter a valid Company Website URL including http/https");
      return;
    }

    let hostname = new URL(domain).hostname;
    let origin = new URL(domain).origin;

    setNewJob((prevJob) => ({
      ...prevJob,
      domain: origin,
      logo: `https://icons.duckduckgo.com/ip3/${hostname}.ico`,
    }));
  };

  const handleStatusChange = (value: string) => {
    setNewJob((prevJob) => ({
      ...prevJob,
      timeline: [
        {
          status: value,
          timestamp: new Date().toISOString(),
        },
      ],
    }));
  };

  // console.log('New Job:', newJob);

  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2 md:px-2">
        <Label htmlFor="workType">Current Status</Label>
        <Select onValueChange={(value) => handleStatusChange(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue
              placeholder={
                applicationStatus?.find(
                  (s) => s?.value === newJob?.timeline?.[0]?.status
                )?.label || "Select Application Status"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {applicationStatus?.map((status) => (
              <SelectItem key={status?.value} value={status?.value}>
                {status?.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2 justify-between place-items-center py-2">
        <ScrollArea className="max-w-[200px] py-3">
          <div className="flex h-fit gap-2">
            {jobTypes.map((jobType) => (
              <Badge
                key={jobType.value}
                variant={
                  newJob?.jobType === jobType.value ? "default" : "outline"
                }
                onClick={() => setNewJob({ ...newJob, jobType: jobType.value })}
                className={cn("cursor-pointer")}
              >
                {jobType.label}
              </Badge>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !newJob?.appliedOn && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {newJob?.appliedOn ? (
                  format(newJob?.appliedOn, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={new Date(newJob?.appliedOn)}
                onSelect={(date) =>
                  setNewJob({ ...newJob, appliedOn: date?.toISOString() || "" })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="grid gap-2 md:px-2">
        <Label htmlFor="jobLink">Application Link</Label>
        <Input
          type="text"
          id="jobLink"
          name="jobLink"
          value={newJob?.jobLink}
          onChange={handleInputChange}
        />
        {newJob?.jobLink !== "" && (
          <Button
            type="button"
            onClick={() => getCompanyDetails({ companyUrl: newJob?.jobLink })}
          >
            Get Company Details
          </Button>
        )}
      </div>
      {
        <div className="p-4 flex gap-2.5 items-center border rounded-md">
          <div className="">
            {loadingCompanyCardPreview ? (
              <LoaderCircle className={cn("animate-spin")} />
            ) : (
              <img
                src={newJob?.logo}
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://icons.veryicon.com/png/o/business/oa-attendance-icon/company-27.png";
                }}
                alt=""
                className="max-h-10 max-w-10 object-fit"
              />
            )}
          </div>
          <div className="border-l pl-2.5 flex flex-col justify-center">
            <h1
              className="text-lg font-bold line-clamp-1"
              title={newJob?.companyName}
            >
              {newJob?.companyName || "Company name"}
            </h1>
            <p className="text-xs">
              {isValidUrl(newJob?.domain)
                ? new URL(newJob?.domain).hostname
                : newJob?.domain || "domain"}
            </p>
          </div>
        </div>
      }
      <div>
        <Accordion type="single" collapsible>
          <AccordionItem
            value="item-1"
            className="border rounded-md p-2 bg-slate-50"
          >
            <AccordionTrigger>Company Details?</AccordionTrigger>
            <AccordionContent className="grid items-start gap-4">
              <div className="grid gap-2 md:px-2">
                <Label htmlFor="domain">Company Website</Label>
                <Input
                  type="text"
                  id="domain"
                  name="domain"
                  value={newJob?.domain}
                  onChange={handleInputChange}
                />
                {newJob?.domain !== "" && (
                  <Button
                    type="button"
                    onClick={() =>
                      getCompanyIconFromDomain({ domain: newJob?.domain })
                    }
                  >
                    Update Logo
                  </Button>
                )}
              </div>
              <div className="grid gap-2 md:px-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={newJob?.companyName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2 md:px-2">
                <Label htmlFor="logo">Company Logo</Label>
                <Input
                  type="text"
                  id="logo"
                  name="logo"
                  value={newJob?.logo}
                  onChange={handleInputChange}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="grid gap-2 md:px-2">
        <Label htmlFor="jobRole">Job Role</Label>
        <Input
          type="text"
          id="jobRole"
          name="jobRole"
          value={newJob?.jobRole}
          onChange={handleInputChange}
        />
      </div>

      <div className="grid gap-2 md:px-2">
        <Label htmlFor="workType">Work Type</Label>
        <Select
          onValueChange={(value) => setNewJob({ ...newJob, workType: value })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue
              placeholder={
                jobWorkTypes.find((i) => i.value === newJob?.workType)?.label ||
                "Select Work Type"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {jobWorkTypes.map((workType) => (
              <SelectItem key={workType.value} value={workType.value}>
                {workType.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2 md:px-2">
        <Label htmlFor="location">Location</Label>
        <Input
          type="text"
          id="location"
          name="location"
          value={newJob?.location}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid gap-2 md:px-2">
        <Label htmlFor="ctc">CTC/Stipend in LPA</Label>
        <Input
          type="text"
          id="ctc"
          name="ctc"
          value={newJob?.ctc}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid gap-2 md:px-2">
        <Label htmlFor="jd">Job Description</Label>
        <Textarea
          id="jd"
          name="jd"
          value={newJob?.jd}
          onChange={handleInputChange}
        />
      </div>
      <Button type="button" onClick={handleSubmit}>
        {applicationStatus?.find(
          (as) => as.value === newJob?.timeline?.[0]?.status
        )?.label || "Save"}
      </Button>
    </form>
  );
}

export default JobApplicationForm;
