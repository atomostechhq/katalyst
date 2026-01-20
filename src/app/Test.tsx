"use client";
import Accordion, {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";
import Card, {
  CardBg,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import nature from "../../public/assets/nature.png";
import Chip from "@/components/Chip";
import ImageCard from "@/components/ImageCard";
import StatsCard from "@/components/StatsCard";
import { LuAngry, LuAnnoyed, LuHeart } from "react-icons/lu";
import {
  Caption,
  Drawer,
  Loading,
  Modal,
  OTPInput,
  Paragraph,
  Popover,
  Radio,
  Skeleton,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabsContainer,
  Textarea,
  Typography,
} from "@/components";
import Checkbox from "@/components/Checkbox";
import Input from "@/components/Input";
import Label from "@/components/Label";
import Toggle from "@/components/Toggle";
import { useTheme } from "@/context/ThemeContext";
import React, { useEffect, useState } from "react";
import {
  RiAddCircleLine,
  RiAddLine,
  RiAlertFill,
  RiCheckboxCircleFill,
  RiCheckLine,
  RiCloseLine,
  RiEditLine,
  RiFacebookLine,
  RiFileLine,
  RiFileTextFill,
  RiFolderFill,
  RiFolderOpenFill,
  RiGlobalLine,
  RiHexagonLine,
  RiInformationLine,
  RiInstagramLine,
  RiLinkedinLine,
  RiMoonLine,
  RiSearch2Line,
  RiSettings4Line,
  RiSunLine,
  RiTwitterLine,
} from "react-icons/ri";
import Button from "@/components/Button";
import Footer, {
  FooterContent,
  FooterHeader,
  FooterIcons,
  FooterList,
} from "@/components/Footer";
import Image from "next/image";
import { HiMiniBars3BottomRight, HiXMark } from "react-icons/hi2";
import Slider from "@/components/Slider";
import ListPagination from "@/components/ListPagination";
import Callout from "@/components/Callout";
import NestedDropdown from "@/components/NestedDropdown";
import Dropdown from "@/components/Dropdown";
import DropdownMenu, {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import FillButton from "@/components/FillButton";
import FloatingButton from "@/components/FloatingButton";
import FileUploadControl, {
  type UploadItem,
} from "@/components/FileUploadControl";
import Notice from "@/components/Notice";
import Progress from "@/components/Progress";
import CircularProgress from "@/components/CircularProgress";
import TreeView from "@/components/TreeView";

interface Option {
  label: string | number;
  value: string | number;
}

const footerItems = [
  {
    label: "Company Info",
    content: [
      { text: "About Us", link: "/about-us" },
      { text: "Career", link: "/career" },
      { text: "We are hiring", link: "/we-are-hiring" },
      { text: "Blog", link: "/blog" },
    ],
  },
  {
    label: "Features",
    content: [
      { text: "Business Marketing", link: "/business-marketing" },
      { text: "User Analytic", link: "/user-analytic" },
      { text: "Live Chat", link: "/live-chat" },
      { text: "Unlimited Support", link: "/unlimited-support" },
    ],
  },
  {
    label: "Resources",
    content: [
      { text: "Help Center", link: "/help-center" },
      { text: "Community", link: "/community" },
      { text: "Developers", link: "/developers" },
      { text: "Partners", link: "/partners" },
    ],
  },
  {
    label: "Legal",
    content: [
      { text: "Privacy Policy", link: "/privacy-policy" },
      { text: "Terms of Service", link: "/terms-of-service" },
      { text: "Cookie Policy", link: "/cookie-policy" },
      { text: "Security", link: "/security" },
    ],
  },
];

const industryList = {
  data: [
    {
      _id: "1",
      name: "Technology",
      children: [
        {
          _id: "101",
          name: "Software Development",
          children: [
            { _id: "1001", name: "Web Development", children: [] },
            { _id: "1002", name: "Mobile Apps", children: [] },
            { _id: "1003", name: "Cloud Computing", children: [] },
          ],
        },
        {
          _id: "102",
          name: "Hardware",
          children: [
            { _id: "1004", name: "Computer Manufacturing", children: [] },
            { _id: "1005", name: "Consumer Electronics", children: [] },
          ],
        },
        {
          _id: "103",
          name: "IT Services",
          children: [
            { _id: "1006", name: "Cybersecurity", children: [] },
            { _id: "1007", name: "Network Solutions", children: [] },
          ],
        },
      ],
    },
    {
      _id: "2",
      name: "Healthcare",
      children: [
        {
          _id: "201",
          name: "Medical Services",
          children: [
            { _id: "2001", name: "Hospitals", children: [] },
            { _id: "2002", name: "Clinics", children: [] },
          ],
        },
        {
          _id: "202",
          name: "Pharmaceuticals",
          children: [
            { _id: "2003", name: "Drug Manufacturing", children: [] },
            { _id: "2004", name: "Research & Development", children: [] },
          ],
        },
      ],
    },
    {
      _id: "3",
      name: "Finance",
      children: [
        {
          _id: "301",
          name: "Banking",
          children: [
            { _id: "3001", name: "Retail Banking", children: [] },
            { _id: "3002", name: "Investment Banking", children: [] },
          ],
        },
        {
          _id: "302",
          name: "Insurance",
          children: [
            { _id: "3003", name: "Life Insurance", children: [] },
            { _id: "3004", name: "Property Insurance", children: [] },
          ],
        },
      ],
    },
    {
      _id: "4",
      name: "Education",
      children: [
        {
          _id: "401",
          name: "Higher Education",
          children: [
            { _id: "4001", name: "Universities", children: [] },
            { _id: "4002", name: "Colleges", children: [] },
          ],
        },
        {
          _id: "402",
          name: "K-12",
          children: [
            { _id: "4003", name: "Public Schools", children: [] },
            { _id: "4004", name: "Private Schools", children: [] },
          ],
        },
      ],
    },
    {
      _id: "5",
      name: "Manufacturing",
      children: [
        {
          _id: "501",
          name: "Automotive",
          children: [
            { _id: "5001", name: "Car Manufacturing", children: [] },
            { _id: "5002", name: "Auto Parts", children: [] },
          ],
        },
        {
          _id: "502",
          name: "Consumer Goods",
          children: [
            { _id: "5003", name: "Apparel", children: [] },
            { _id: "5004", name: "Home Appliances", children: [] },
          ],
        },
      ],
    },
    {
      _id: "6",
      name: "Retail",
      children: [
        {
          _id: "601",
          name: "E-commerce",
          children: [
            { _id: "6001", name: "Online Marketplaces", children: [] },
            { _id: "6002", name: "Direct-to-Consumer", children: [] },
          ],
        },
        {
          _id: "602",
          name: "Brick & Mortar",
          children: [
            { _id: "6003", name: "Department Stores", children: [] },
            { _id: "6004", name: "Specialty Stores", children: [] },
          ],
        },
      ],
    },
    {
      _id: "7",
      name: "Transportation",
      children: [
        {
          _id: "701",
          name: "Logistics",
          children: [
            { _id: "7001", name: "Shipping", children: [] },
            { _id: "7002", name: "Warehousing", children: [] },
          ],
        },
        {
          _id: "702",
          name: "Passenger Services",
          children: [
            { _id: "7003", name: "Airlines", children: [] },
            { _id: "7004", name: "Railways", children: [] },
          ],
        },
      ],
    },
    {
      _id: "8",
      name: "Real Estate",
      children: [
        {
          _id: "801",
          name: "Residential",
          children: [
            { _id: "8001", name: "Apartments", children: [] },
            { _id: "8002", name: "Houses", children: [] },
          ],
        },
        {
          _id: "802",
          name: "Commercial",
          children: [
            { _id: "8003", name: "Office Spaces", children: [] },
            { _id: "8004", name: "Retail Spaces", children: [] },
          ],
        },
      ],
    },
  ],
};

const iconsArray = [
  { icon: <RiTwitterLine />, link: "https://twitter.com" },
  { icon: <RiInstagramLine />, link: "https://instagram.com" },
  { icon: <RiFacebookLine />, link: "https://facebook.com" },
  { icon: <RiLinkedinLine />, link: "https://linkedin.com" },
];

const dummyData = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  name: `Chip ${index + 1}`,
}));

const Test = () => {
  const { switchDark, switchLight } = useTheme();
  const [isDark, setIsDark] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsDark(checked);

    if (checked) {
      switchDark();
    } else {
      switchLight();
    }
  };

  // navbar
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    // Prevent scrolling on the body when the menu is open
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showMenu]);

  // otp
  const [otp, setOtp] = useState("");

  // toggle
  const [isChecked, setIsChecked] = useState(false);

  // dropdown
  const [multiSelect, setMultiSelect] = useState<Option[]>([]);
  const [singleSelect, setSingleSelect] = useState<Option[]>([]);

  // file upload
  const [items, setItems] = useState<UploadItem[]>([]);

  const handleAddFiles = (files: File[]) => {
    const newItems: UploadItem[] = files.map((file) => ({
      id: Math.random().toString(36).slice(2),
      file,
      name: file.name,
      size: file.size,
      progress: 0,
      status: "idle",
    }));

    setItems((prev) => [...prev, ...newItems]);
  };

  const handleUpdateItem = (id: string, updates: Partial<UploadItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  };

  const handleUpload = async (
    file: File,
    onProgress: (progress: number) => void,
  ) => {
    // Simulate progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      onProgress(progress);
    }

    // ---- ⚠️ Random failure simulation ----
    const shouldFail = Math.random() < 0.3; // 30% chance to fail
    if (shouldFail) {
      throw new Error("Upload failed. Please try again.");
    }

    // Success
    return URL.createObjectURL(file);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handlePreview = (id: string) => {
    const item = items.find((item) => item.id === id);
    if (item && item.previewUrl) {
      window.open(item.previewUrl, "_blank");
    }
  };

  // treeview
  const [selected, setSelected] = useState<string | null>(null);

  // slider
  const [sliderValue, setSliderValue] = useState<number>(50);

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
  };

  const rowsPerPage = 5;
  const [page, setPage] = useState(0);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const paginatedData = dummyData.slice(
    page * rowsPerPage,

    page * rowsPerPage + rowsPerPage,
  );

  const [isAllExpanded, setIsAllExpanded] = useState(false);

  // drawer
  type DrawerPosition = "top" | "right" | "bottom" | "left";
  const [openPosition, setOpenPosition] = useState<DrawerPosition | undefined>(
    undefined,
  );

  const positions: DrawerPosition[] = ["top", "right", "bottom", "left"];

  // modal
  const [showModal, setShowModal] = useState(false);

  // tabs
  const [value, setValue] = useState("1");

  const handleTabChange = (newValue: string) => {
    setValue(newValue);
  };

  // popover
  const [isOpen, setIsOpen] = useState(false);

  // floating button
  const [showButton, setShowButton] = useState(false);

  // notice
  const [notice, setNotice] = useState(false);

  // progress
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(80), 500);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="bg-light dark:bg-dark">
      <Typography variant="h6">Top Nav Glass</Typography>
      <div className="px-[30px] mobile:mx-0 tablet:mx-0 rounded-radius-md transition-colors duration-300 sticky top-2 backdrop-blur-md z-[100] border-t border-b border-b-[#0707071F] border-[#FFFFFF29]">
        <header className="w-full p-4 flex justify-between items-center h-[62px] tablet:h-[56px]">
          <Image
            src="/ImgPlaceholder.svg"
            alt="placeholder"
            width={84}
            height={29}
          />
          <div className="flex gap-4 items-center">
            <section className="flex gap-1 items-center">
              <Toggle
                id="themeToggle"
                size="lg"
                icon={
                  !isDark ? <RiSunLine size={14} /> : <RiMoonLine size={14} />
                }
                checked={isDark}
                onChange={handleChange}
              />
            </section>
            <span
              className="hidden tablet:inline-block  text-dark dark:text-light"
              onClick={() => setShowMenu((prev) => !prev)}
            >
              {!showMenu ? (
                <HiMiniBars3BottomRight size={24} />
              ) : (
                <HiXMark size={24} />
              )}
            </span>
          </div>
        </header>
      </div>

      <section className="my-10 mx-10 flex items-center gap-5">
        <Typography variant="h6">Nested Dropdown: </Typography>
        <NestedDropdown
          data={industryList?.data || []}
          onSelect={(_, path) => {
            const pathIds = path?.map((p) => p?._id);
            console.log("Selected Path IDs:", pathIds);
          }}
          placeholder="Select Parent"
        />
      </section>

      <main className="space-y-5 p-4">
        {/* Typography */}
        <section className="space-y-3">
          <Typography variant="h6">Typography</Typography>
          <Typography variant="h1">H1 Headline</Typography>
          <Typography variant="h2">H2 Headline</Typography>
          <Typography variant="h3">H3 Headline</Typography>
          <Typography variant="h4">H4 Headline</Typography>
          <Typography variant="h5">H5 Headline</Typography>
          <Typography variant="h6">H6 Headline</Typography>
        </section>
        {/* Paragraph */}
        <section className="space-y-3">
          <Typography variant="h6">Paragraph</Typography>
          <Paragraph>The quick brown fox jumps over the lazy dog</Paragraph>
          <Paragraph variant="b2">
            The quick brown fox jumps over the lazy dog
          </Paragraph>
          <Paragraph variant="b3">
            The quick brown fox jumps over the lazy dog
          </Paragraph>
          <Paragraph variant="b4">
            The quick brown fox jumps over the lazy dog
          </Paragraph>
        </section>
        {/* Caption */}
        <section className="space-y-3">
          <Typography variant="h6">Caption</Typography>
          <br />
          <Caption variant="md">
            The quick brown fox jumps over the lazy dog
          </Caption>
          <br />
          <Caption>The quick brown fox jumps over the lazy dog</Caption>
        </section>
        {/* Label */}
        <section className="space-y-3">
          <Typography variant="h6">Label</Typography>
          <Label size={"sm"}>This is a Label</Label>
          <br />
          <Label size={"md"}>This is a Label</Label>
          <br />
          <Label size={"lg"} required>
            This is a Label
          </Label>
        </section>
        {/* Input */}
        <section className="space-y-3 min-h-[200px]">
          <Typography variant="h6">Input</Typography>
          <Input
            type="text"
            startIcon={<RiAddCircleLine />}
            placeholder="Enter your text here"
            endIcon={<RiAddCircleLine />}
          />
          <Input
            type="text"
            disabled
            placeholder="Enter your text here"
            startIcon={<RiAddCircleLine />}
            endIcon={<RiAddCircleLine />}
          />
          <Textarea
            placeholder="Enter your text here"
            className="resize-none"
            rows={4}
          />
          <Textarea
            disabled
            placeholder="Enter your text here"
            className="resize-none"
            rows={4}
          />
          <div
            className="space-y-5 min-h-[200px] p-10 div-glass"
            style={{ backgroundImage: `url(${nature.src})` }}
          >
            <Input
              type="text"
              variant={"glass"}
              startIcon={<RiAddCircleLine />}
              placeholder="Enter your text here"
              endIcon={<RiAddCircleLine />}
            />
            <Input
              type="text"
              variant={"glass"}
              disabled
              startIcon={<RiAddCircleLine />}
              placeholder="Enter your text here"
              endIcon={<RiAddCircleLine />}
            />
            <Textarea
              variant={"glass"}
              placeholder="Enter your text here"
              className="resize-none"
              rows={4}
            />
            <Textarea
              variant={"glass"}
              disabled
              placeholder="Enter your text here"
              className="resize-none"
              rows={4}
            />
          </div>
        </section>
        {/* OTP */}
        <section className="space-y-3">
          <Typography variant="h6">OTP</Typography>
          <div className="space-y-2">
            <OTPInput type="text" length={4} onChange={setOtp} />
            <OTPInput type="number" length={5} onChange={setOtp} />
            <OTPInput type="password" length={6} onChange={setOtp} />
            <Paragraph variant={"b3"} className="mt-4 text-gray-700">
              Your OTP: {otp}
            </Paragraph>
          </div>
          <Caption variant={"md"}>Note: you can also paste values</Caption>
        </section>
        {/* Checkbox */}
        <section className="space-y-3">
          <Typography variant="h6">Checkbox</Typography>
          <div className="flex items-center gap-2">
            <Checkbox id="check1" />
            <Label size={"md"} htmlFor="check1">
              This is a default state
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="checksq" square />
            <Label size={"md"} htmlFor="checksq">
              This is in square variant
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox checked readOnly id="check2" />
            <Label size={"md"} htmlFor="check2">
              This is a checked state
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox checked readOnly disabled id="check3" />
            <Label size={"md"} htmlFor="check3" disabled>
              This is a disabled state
            </Label>
          </div>
        </section>
        {/* Toggle */}
        <section className="space-y-3">
          <Typography variant="h6">Toggle</Typography>
          <div className="flex items-center gap-2">
            <Toggle id="smallToggle" size="sm" />
            <Label size={"md"} htmlFor="smallToggle">
              Small Toggle
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Toggle id="largeToggle" size="lg" />
            <Label size={"md"} htmlFor="largeToggle">
              Large Toggle
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Toggle checked readOnly />
            <Label size={"md"}>This is a checked state</Label>
          </div>
          <div className="flex items-center gap-2">
            <Toggle disabled readOnly />
            <Label size={"md"} disabled>
              This is a OFF disabled state
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Toggle checked readOnly disabled />
            <Label size={"md"} disabled>
              This is a ON disabled state
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Toggle
              readOnly
              id="icon"
              icon={<RiCheckLine className="text-primary-400" />}
            />
            <Label size={"md"} htmlFor="icon">
              Toggle With Icon
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Toggle
              id="icon2"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              icon={isChecked ? <RiCheckLine /> : <RiCloseLine />}
            />
            <Label size={"md"} htmlFor="icon2">
              Toggle With Icon
            </Label>
          </div>
        </section>
        {/* Radio */}
        <section className="space-y-3">
          <Typography variant="h6">Radio</Typography>
          <section className="flex items-center gap-4">
            <h1>Size with Text:</h1>
            <div role="radiogroup" aria-label="Options">
              <Label htmlFor="option1" className="flex items-center gap-2">
                <Radio id="option1" name="options" />
                Option 1
              </Label>
              <Label htmlFor="option2" className="flex items-center gap-2">
                <Radio id="option2" name="options" />
                Option 2
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio id="radioTextLarge" size="lg" />
              <Label htmlFor="radioTextLarge" required>
                Large
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio id="radioTextSmall" size="sm" />
              <Label htmlFor="radioTextSmall">Small</Label>
            </div>
          </section>
          <section className="flex items-center gap-4">
            <h1>States:</h1>
            <div className="flex items-center gap-2">
              <Radio id="disable" size="lg" disabled />
              <Label disabled htmlFor="disable">
                Disabled
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio id="check" size="lg" readOnly checked />
              <Label htmlFor="check">Checked</Label>
            </div>
          </section>
          <section className="flex items-center gap-4">
            <h1>Radio with Text and Subtext: </h1>
            <div className="flex items-start gap-2">
              <Radio name="radioWithText" id="smallRadio" size="sm" />
              <div className="flex flex-col -mt-1">
                <Label htmlFor="smallRadio">Text with small radio button</Label>
                <Caption>This is a helper text</Caption>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Radio name="radioWithText" id="largeRadio" size="lg" />
              <div className="flex flex-col -mt-1">
                <Label htmlFor="largeRadio">Text with large radio button</Label>
                <Caption>This is a helper text</Caption>
              </div>
            </div>
          </section>
        </section>
        {/* Chip */}
        <section className="space-y-3">
          <Typography variant="h6">Chips</Typography>
          <div className="flex gap-4 items-center">
            <Typography variant="h6">Chips Variant</Typography>
            <Chip
              startIcon={<LuAnnoyed />}
              endIcon={<LuAngry />}
              variant="primary"
              size="md"
            >
              Primary
            </Chip>
            <Chip variant="secondary" size="md">
              Secondary
            </Chip>
            <Chip variant="default" size="md">
              Default
            </Chip>
            <Chip variant="glass" size="md">
              Glass
            </Chip>
          </div>
          <div className="flex gap-4 items-center my-4">
            <Typography variant={"h6"}>Sizes - </Typography>
            <Chip variant="default" size="xs">
              Default
            </Chip>
            <Chip endIcon={<LuHeart />} variant="primary" size="sm">
              Solid
            </Chip>
            <Chip variant="primary" size="md">
              Primary
            </Chip>
            <Chip variant="primary" size="lg">
              Secondary
            </Chip>
          </div>
        </section>
        {/* Dropdown */}
        <section className="space-y-3">
          <Typography variant="h6">Dropdown</Typography>
          <div className="flex flex-wrap items-center gap-10">
            <Dropdown
              options={[
                { label: "High", value: "High", disabledOption: true },
                { label: "Medium", value: "Medium" },
                { label: "Low", value: "Low" },
                { label: "High", value: "High" },
                { label: "Medium", value: "Medium" },
                { label: "Low", value: "Low" },
                { label: "High", value: "High" },
                { label: "Medium", value: "Medium" },
                { label: "Low", value: "Low" },
              ]}
              selected={multiSelect}
              setSelected={setMultiSelect}
              width="300px"
              dropdownText="Multiple Dropdown"
              multiple
              search
              dropdownFooter={true}
              onApply={() => {
                alert("Apply button clicked");
              }}
            />
            <Dropdown
              options={[
                { label: "Option 1", value: 1 },
                { label: "Option 2", value: 2 },
                { label: "Option 3", value: 3 },
              ]}
              selected={singleSelect}
              icon={<RiGlobalLine size={16} />}
              setSelected={setSingleSelect}
              dropdownText="Single Dropdown"
              info="info"
              width="300px"
            />
          </div>
        </section>
        {/* File Upload */}
        <section className="space-y-3">
          <Typography variant="h6">File Upload</Typography>
          <FileUploadControl
            items={items}
            onAddFiles={handleAddFiles}
            onUpdateItem={handleUpdateItem}
            onDelete={handleDelete}
            onUpload={handleUpload}
            onPreview={handlePreview}
            multiple={true}
            accept="image/*, .pdf, .doc, .docx, .xlsx, .mp3"
            maxSizeMB={15}
            hintText="Drag and drop files or click to upload"
          />
        </section>
        {/* Dropdown Menu */}
        <section className="space-y-3">
          <Typography variant="h6">Dropdown Menu</Typography>
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <Paragraph variant={"b3"}>Basic Dropdown</Paragraph>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button size={"xs"}>Open Basic Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => console.log("Profile clicked")}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => console.log("Settings clicked")}
                  >
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>Disabled Item</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <Paragraph variant={"b3"}>Dropdown with Submenu</Paragraph>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button size={"xs"}>Open Menu with Submenu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>

                  {/* Submenu Example */}
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      More Options
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Support</DropdownMenuItem>
                      <DropdownMenuItem>API Keys</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>

                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Menu One</DropdownMenuItem>
                  <DropdownMenuItem>Menu Two</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <Paragraph variant={"b3"}>Left Aligned Menu</Paragraph>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button size={"xs"}>Open Left Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="left">
                  <DropdownMenuItem onClick={() => alert("Item 1 clicked")}>
                    Item 1
                  </DropdownMenuItem>
                  <DropdownMenuItem>Item 2</DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Submenu</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
                      <DropdownMenuItem>Sub Item 2</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <Paragraph variant={"b3"}>Center Aligned Menu</Paragraph>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button size={"xs"}>Open Center Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DropdownMenuItem>Center Item 1</DropdownMenuItem>
                  <DropdownMenuItem>Center Item 2</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <Paragraph variant={"b3"}>Complex Nested Menu</Paragraph>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button size={"xs"}>Complex Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72">
                  <DropdownMenuLabel>User Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <div className="flex items-center gap-2">
                      <span>👤</span>
                      <span>Profile</span>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <div className="flex items-center gap-2">
                        <span>⚙️</span>
                        <span>Settings</span>
                      </div>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          Appearance
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>Light Mode</DropdownMenuItem>
                          <DropdownMenuItem>Dark Mode</DropdownMenuItem>
                          <DropdownMenuItem>System</DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                      <DropdownMenuItem>Notifications</DropdownMenuItem>
                      <DropdownMenuItem>Privacy</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 hover:bg-red-50">
                    <div className="flex items-center gap-2">
                      <span>🚪</span>
                      <span>Logout</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex items-center gap-6 p-5">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button size={"xs"}>Top</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="top">
                <DropdownMenuLabel>Top Position</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button size={"xs"}>Bottom</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="bottom">
                <DropdownMenuLabel>Bottom Position</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button size={"xs"}>Left</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="left">
                <DropdownMenuLabel>Left Position</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button size={"xs"}>Right</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="right">
                <DropdownMenuLabel>Right Position</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button size={"xs"}>Center</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="center">
                <DropdownMenuLabel>Center Aligned</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button size={"xs"}>Wide Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80" align="end">
                <DropdownMenuLabel>Wide Menu (320px)</DropdownMenuLabel>
                <DropdownMenuItem>Profile with very long text</DropdownMenuItem>
                <DropdownMenuItem>Settings with extra content</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    Invite users with long text
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email invitation</DropdownMenuItem>
                    <DropdownMenuItem>Message invitation</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More options...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    Invite users with long text
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email invitation</DropdownMenuItem>
                    <DropdownMenuItem>Message invitation</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More options...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </section>
        {/* Tree View */}
        <section className="space-y-3">
          <Typography variant="h6">Tree View</Typography>
          <TreeView
            aria-label="Project files"
            defaultExpandedIds={["frontend"]}
            className="w-1/2 border border-gray-200 p-3 rounded-md"
          >
            {/* FRONTEND SECTION */}
            <TreeView.Item
              id="frontend"
              onSelect={setSelected}
              selected={selected === "frontend"}
            >
              <TreeView.LeadingVisual>
                <RiAlertFill />{" "}
              </TreeView.LeadingVisual>{" "}
              Frontend
              <TreeView.SubTree>
                <TreeView.Item
                  id="frontend-react"
                  onSelect={setSelected}
                  selected={selected === "frontend-react"}
                >
                  React App
                  <TreeView.SubTree>
                    <TreeView.Item
                      id="frontend-react-components"
                      onSelect={setSelected}
                      selected={selected === "frontend-react-components"}
                    >
                      <TreeView.LeadingVisual>
                        <RiAlertFill />{" "}
                      </TreeView.LeadingVisual>{" "}
                      Components
                      <TreeView.SubTree>
                        <TreeView.Item
                          id="frontend-react-components-button"
                          onSelect={setSelected}
                          selected={
                            selected === "frontend-react-components-button"
                          }
                        >
                          <Button
                            onClick={() => {
                              alert("clicked");
                            }}
                          >
                            Click
                          </Button>
                        </TreeView.Item>
                        <TreeView.Item
                          id="frontend-react-components-modal"
                          onSelect={setSelected}
                          selected={
                            selected === "frontend-react-components-modal"
                          }
                        >
                          Modal
                        </TreeView.Item>
                      </TreeView.SubTree>
                    </TreeView.Item>

                    <TreeView.Item
                      id="frontend-react-hooks"
                      onSelect={setSelected}
                      selected={selected === "frontend-react-hooks"}
                    >
                      Hooks
                    </TreeView.Item>
                    <TreeView.Item
                      id="frontend-react-context"
                      onSelect={setSelected}
                      selected={selected === "frontend-react-context"}
                    >
                      Context
                    </TreeView.Item>
                  </TreeView.SubTree>
                </TreeView.Item>

                <TreeView.Item
                  id="frontend-next"
                  onSelect={setSelected}
                  selected={selected === "frontend-next"}
                >
                  Next.js App
                  <TreeView.SubTree>
                    <TreeView.Item
                      id="frontend-next-pages"
                      onSelect={setSelected}
                      selected={selected === "frontend-next-pages"}
                    >
                      Pages
                    </TreeView.Item>
                    <TreeView.Item
                      id="frontend-next-api"
                      onSelect={setSelected}
                      selected={selected === "frontend-next-api"}
                    >
                      API Routes
                    </TreeView.Item>
                  </TreeView.SubTree>
                </TreeView.Item>
              </TreeView.SubTree>
            </TreeView.Item>

            {/* BACKEND SECTION */}
            <TreeView.Item
              id="backend"
              onSelect={setSelected}
              selected={selected === "backend"}
            >
              Backend
              <TreeView.SubTree>
                <TreeView.Item
                  id="backend-api"
                  onSelect={setSelected}
                  selected={selected === "backend-api"}
                >
                  API Routes
                  <TreeView.SubTree>
                    <TreeView.Item
                      id="backend-api-auth"
                      onSelect={setSelected}
                      selected={selected === "backend-api-auth"}
                    >
                      Auth
                    </TreeView.Item>
                    <TreeView.Item
                      id="backend-api-users"
                      onSelect={setSelected}
                      selected={selected === "backend-api-users"}
                    >
                      Users
                    </TreeView.Item>
                    <TreeView.Item
                      id="backend-api-products"
                      onSelect={setSelected}
                      selected={selected === "backend-api-products"}
                    >
                      Products
                    </TreeView.Item>
                  </TreeView.SubTree>
                </TreeView.Item>

                <TreeView.Item
                  id="backend-database"
                  onSelect={setSelected}
                  selected={selected === "backend-database"}
                >
                  Database
                  <TreeView.SubTree>
                    <TreeView.Item
                      id="backend-database-models"
                      onSelect={setSelected}
                      selected={selected === "backend-database-models"}
                    >
                      Models
                    </TreeView.Item>
                    <TreeView.Item
                      id="backend-database-migrations"
                      onSelect={setSelected}
                      selected={selected === "backend-database-migrations"}
                    >
                      Migrations
                    </TreeView.Item>
                    <TreeView.Item
                      id="backend-database-seeds"
                      onSelect={setSelected}
                      selected={selected === "backend-database-seeds"}
                    >
                      Seeds
                    </TreeView.Item>
                  </TreeView.SubTree>
                </TreeView.Item>
              </TreeView.SubTree>
            </TreeView.Item>
          </TreeView>
          <TreeView
            aria-label="Project files"
            defaultExpandedIds={["frontend"]}
            className="w-1/2 border border-gray-200 p-3 rounded-md"
          >
            {/* FRONTEND */}
            <TreeView.Item id="frontend">
              <TreeView.LeadingVisual>
                <RiFolderFill className="text-blue-500" />
              </TreeView.LeadingVisual>
              Frontend
              <TreeView.SubTree>
                <TreeView.Item id="frontend-react">
                  <TreeView.LeadingVisual>
                    <RiFolderFill className="text-blue-400" />
                  </TreeView.LeadingVisual>
                  React App
                  <TreeView.SubTree>
                    <TreeView.Item id="frontend-react-components">
                      Components
                      <TreeView.SubTree>
                        <TreeView.Item id="btn-js">
                          <TreeView.LeadingVisual>
                            <RiFileTextFill />
                          </TreeView.LeadingVisual>
                          Button.tsx
                        </TreeView.Item>
                      </TreeView.SubTree>
                    </TreeView.Item>
                  </TreeView.SubTree>
                </TreeView.Item>
              </TreeView.SubTree>
            </TreeView.Item>

            {/* BACKEND */}
            <TreeView.Item id="backend">
              <TreeView.LeadingVisual>
                <RiFolderFill className="text-amber-500" />
              </TreeView.LeadingVisual>
              Backend
              <TreeView.SubTree>
                <TreeView.Item id="backend-api">API Routes</TreeView.Item>
              </TreeView.SubTree>
            </TreeView.Item>

            {/* SETTINGS (No SubTree) */}
            <TreeView.Item id="settings">
              <TreeView.LeadingVisual>
                <RiSettings4Line />
              </TreeView.LeadingVisual>
              Settings
            </TreeView.Item>
          </TreeView>
          <TreeView
            aria-label="Files changed"
            defaultExpandedIds={["src"]}
            className="w-1/2 border border-gray-200 p-3 rounded-md"
          >
            <TreeView.Item
              id="src"
              onSelect={setSelected}
              selected={selected === "src"}
            >
              <TreeView.LeadingVisual>
                <RiFolderOpenFill color="#1765dc" size={16} />
              </TreeView.LeadingVisual>
              src
              <TreeView.SubTree>
                <TreeView.Item
                  id="src/Avatar.tsx"
                  onSelect={setSelected}
                  selected={selected === "src/Avatar.tsx"}
                >
                  <TreeView.LeadingVisual>
                    <RiFileLine size={16} />
                  </TreeView.LeadingVisual>
                  Avatar.tsx
                  <TreeView.TrailingVisual label="Added">
                    <RiAddLine size={16} />
                  </TreeView.TrailingVisual>
                </TreeView.Item>

                <TreeView.Item
                  id="src/Button.tsx"
                  onSelect={setSelected}
                  selected={selected === "src/Button.tsx"}
                >
                  <TreeView.LeadingVisual>
                    <RiFileLine size={16} />
                  </TreeView.LeadingVisual>
                  Button.tsx
                  <TreeView.TrailingVisual label="Modified">
                    <RiEditLine size={16} />
                  </TreeView.TrailingVisual>
                </TreeView.Item>
              </TreeView.SubTree>
            </TreeView.Item>

            <TreeView.Item
              id="package.json"
              onSelect={setSelected}
              selected={selected === "package.json"}
            >
              <TreeView.LeadingVisual>
                <RiFileLine size={16} />
              </TreeView.LeadingVisual>
              package.json
              <TreeView.TrailingVisual label="Modified">
                <RiEditLine size={16} />
              </TreeView.TrailingVisual>
            </TreeView.Item>
          </TreeView>
          <div className="my-5">
            <h1>Allow multiple expanded (default)</h1>
            <TreeView
              aria-label="Example Tree"
              className="w-1/2 border border-gray-200 p-3 rounded-md"
            >
              <TreeView.Item id="1">
                Parent 1
                <TreeView.SubTree>
                  <TreeView.Item id="1.1">Child 1</TreeView.Item>
                  <TreeView.Item id="1.2">Child 2</TreeView.Item>
                </TreeView.SubTree>
              </TreeView.Item>

              <TreeView.Item id="2">
                Parent 2
                <TreeView.SubTree>
                  <TreeView.Item id="2.1">Child A</TreeView.Item>
                  <TreeView.Item id="2.2">Child B</TreeView.Item>
                </TreeView.SubTree>
              </TreeView.Item>
            </TreeView>
          </div>
          <div>
            <h1>Treeview Mode (only one expanded)</h1>
            <TreeView
              aria-label="Accordion Tree"
              allowMultiple={false}
              className="w-1/2 border border-gray-200 p-3 rounded-md"
            >
              <TreeView.Item id="1">
                Section 1
                <TreeView.SubTree>
                  <TreeView.Item id="1.1">Item A</TreeView.Item>
                </TreeView.SubTree>
              </TreeView.Item>
              <TreeView.Item id="2">
                Section 2
                <TreeView.SubTree>
                  <TreeView.Item id="2.1">Item B</TreeView.Item>
                </TreeView.SubTree>
              </TreeView.Item>
            </TreeView>
          </div>
        </section>
        <div className="border rounded-lg p-2 bg-white dark:bg-gray-950">
          <div className="mt-4 text-xs text-gray-500 px-2">
            Selected: {selected || "None"}
          </div>
        </div>

        <section className="space-y-4">
          <Typography variant={"h6"}>Pricing Cards</Typography>
          <div className="flex flex-wrap items-center gap-spacing-lg">
            <Card className="w-full p-spacing-md md:p-spacing-lg max-w-[333px] space-y-spacing-md bg-light border-2 border-primary-200 rounded-radius-xl">
              <CardHeader className="space-y-3.5">
                <div className="flex items-center gap-spacing-md">
                  <p className="bg-primary-400 p-3 rounded-radius-lg">
                    <RiHexagonLine size={60} className="text-light" />
                  </p>
                  <div>
                    <CardTitle className="text-xl font-semibold dark:text-dark">
                      Label
                    </CardTitle>
                    <CardDescription className="text-xl text-gray-800 dark:text-gray-800">
                      Caption for label
                    </CardDescription>
                  </div>
                </div>
                <Paragraph
                  variant={"b3"}
                  className="text-gray-600 dark:text-gray-600"
                >
                  Lorem ipsum dolor sit amet doloroli sitiol conse ctetur
                  adipiscing elit.{" "}
                </Paragraph>
              </CardHeader>
              <CardContent className="space-y-spacing-md">
                <div className="flex items-end">
                  <Typography variant={"h3"} className="dark:text-dark">
                    $399
                  </Typography>
                  <Paragraph
                    variant={"b2"}
                    className="text-gray-600 dark:text-gray-600 mb-3"
                  >
                    /monthly
                  </Paragraph>
                </div>
                <div className="space-y-spacing-sm">
                  <Typography
                    variant={"h6"}
                    className="text-gray-800 dark:text-gray-800"
                  >
                    What&apos;s included
                  </Typography>
                  <ul className="text-primary-500">
                    <li className="flex items-start gap-spacing-sm">
                      <RiCheckboxCircleFill size={24} className="mt-1" />
                      <Paragraph
                        variant={"b2"}
                        className="text-gray-800 dark:text-gray-800"
                      >
                        All analytics features
                      </Paragraph>
                    </li>
                    <li className="flex items-start gap-spacing-sm">
                      <RiCheckboxCircleFill size={24} className="mt-1" />
                      <Paragraph
                        variant={"b2"}
                        className="text-gray-800 dark:text-gray-800"
                      >
                        All analytics features
                      </Paragraph>
                    </li>
                    <li className="flex items-start gap-spacing-sm">
                      <RiCheckboxCircleFill size={24} className="mt-1" />
                      <Paragraph
                        variant={"b2"}
                        className="text-gray-800 dark:text-gray-800"
                      >
                        All analytics features
                      </Paragraph>
                    </li>
                    <li className="flex items-start gap-spacing-sm">
                      <RiCheckboxCircleFill size={24} className="mt-1" />
                      <Paragraph
                        variant={"b2"}
                        className="text-gray-800 dark:text-gray-800"
                      >
                        All analytics features
                      </Paragraph>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button fullWidth size={"md"} endIcon={<RiAddLine />}>
                  Button
                </Button>
              </CardFooter>
            </Card>
            <Card className="w-full text-light p-spacing-md md:p-spacing-lg max-w-[333px] space-y-spacing-md border-2 border-primary-200 rounded-radius-xl bg-gradient-to-r from-primary-700 from-[-10.81%] to-primary-900 to-[93.83%]">
              <CardHeader className="space-y-3.5">
                <div className="flex items-center gap-spacing-md">
                  <p className="bg-primary-400 p-3 rounded-radius-lg">
                    <RiHexagonLine size={60} className="text-light" />
                  </p>
                  <div>
                    <CardTitle className="text-xl font-semibold text-light">
                      Label
                    </CardTitle>
                    <CardDescription className="text-xl text-light">
                      Caption for label
                    </CardDescription>
                  </div>
                </div>
                <Paragraph variant={"b3"} className="text-light">
                  Lorem ipsum dolor sit amet doloroli sitiol conse ctetur
                  adipiscing elit.{" "}
                </Paragraph>
              </CardHeader>
              <CardContent className="space-y-spacing-md">
                <div className="flex items-end">
                  <Typography variant={"h3"} className="text-light">
                    $399
                  </Typography>
                  <Paragraph variant={"b2"} className="text-gray-400 mb-3">
                    /monthly
                  </Paragraph>
                </div>
                <div className="space-y-spacing-sm">
                  <Typography variant={"h6"} className="text-light">
                    What&apos;s included
                  </Typography>
                  <ul className="text-primary-500">
                    <li className="flex items-start gap-spacing-sm">
                      <RiCheckboxCircleFill size={24} className="mt-1" />
                      <Paragraph variant={"b2"} className="text-light">
                        All analytics features
                      </Paragraph>
                    </li>
                    <li className="flex items-start gap-spacing-sm">
                      <RiCheckboxCircleFill size={24} className="mt-1" />
                      <Paragraph variant={"b2"} className="text-light">
                        All analytics features
                      </Paragraph>
                    </li>
                    <li className="flex items-start gap-spacing-sm">
                      <RiCheckboxCircleFill size={24} className="mt-1" />
                      <Paragraph variant={"b2"} className="text-light">
                        All analytics features
                      </Paragraph>
                    </li>
                    <li className="flex items-start gap-spacing-sm">
                      <RiCheckboxCircleFill size={24} className="mt-1" />
                      <Paragraph variant={"b2"} className="text-light">
                        All analytics features
                      </Paragraph>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  fullWidth
                  size={"md"}
                  variant={"primary-light"}
                  endIcon={<RiAddLine />}
                >
                  Button
                </Button>
              </CardFooter>
            </Card>
            <Card className="w-full p-spacing-md md:p-spacing-lg max-w-[717px] space-y-spacing-md bg-light border-2 border-primary-200 rounded-radius-xl flex md:flex-row flex-col items-center gap-spacing-md">
              <CardHeader className="space-y-3.5 pr-spacing-md md:border-r md:border-gray-400 flex-[0.6]">
                <div className="flex items-center gap-spacing-md">
                  <p className="bg-primary-400 p-3 rounded-radius-lg">
                    <RiHexagonLine size={60} className="text-light" />
                  </p>
                  <div>
                    <CardTitle className="text-xl font-semibold dark:text-dark">
                      Label
                    </CardTitle>
                    <CardDescription className="text-xl text-gray-800 dark:text-gray-800">
                      Caption for label
                    </CardDescription>
                  </div>
                </div>
                <Paragraph
                  variant={"b3"}
                  className="text-gray-600 dark:text-gray-600"
                >
                  Lorem ipsum dolor sit amet doloroli sitiol conse ctetur
                  adipiscing elit.{" "}
                </Paragraph>
                <div className="flex items-end">
                  <Typography variant={"h3"} className="dark:text-dark">
                    $399
                  </Typography>
                  <Paragraph
                    variant={"b2"}
                    className="text-gray-600 dark:text-gray-600 mb-3"
                  >
                    /monthly
                  </Paragraph>
                </div>
                <Button fullWidth size={"md"} endIcon={<RiAddLine />}>
                  Button
                </Button>
              </CardHeader>
              <CardContent className="space-y-spacing-sm w-full flex-[0.4]">
                <Typography
                  variant={"h6"}
                  className="text-gray-800 dark:text-gray-800"
                >
                  What&apos;s included
                </Typography>
                <ul className="text-primary-500 space-y-2.5">
                  <li className="flex items-start gap-spacing-sm">
                    <RiCheckboxCircleFill size={24} className="mt-1" />
                    <Paragraph
                      variant={"b2"}
                      className="text-gray-800 dark:text-gray-800"
                    >
                      All analytics features
                    </Paragraph>
                  </li>
                  <li className="flex items-start gap-spacing-sm">
                    <RiCheckboxCircleFill size={24} className="mt-1" />
                    <Paragraph
                      variant={"b2"}
                      className="text-gray-800 dark:text-gray-800"
                    >
                      All analytics features
                    </Paragraph>
                  </li>
                  <li className="flex items-start gap-spacing-sm">
                    <RiCheckboxCircleFill size={24} className="mt-1" />
                    <Paragraph
                      variant={"b2"}
                      className="text-gray-800 dark:text-gray-800"
                    >
                      All analytics features
                    </Paragraph>
                  </li>
                  <li className="flex items-start gap-spacing-sm">
                    <RiCheckboxCircleFill size={24} className="mt-1" />
                    <Paragraph
                      variant={"b2"}
                      className="text-gray-800 dark:text-gray-800"
                    >
                      All analytics features
                    </Paragraph>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
        <section>
          <Typography variant={"h6"}>Cards: </Typography>
          <div className="my-5">
            <h1>Card Large</h1>
            <Card className="w-[70%] rounded-radius-lg px-[64px] py-[32px] gradientOne border-2 border-primary-500 hover:border-2 hover:border-primary-500">
              <CardHeader>
                <CardTitle className="text-[32px] font-bold leading-[48px] text-white">
                  Modal Card Title
                </CardTitle>
                <CardDescription className="my-4 text-[24px]">
                  Lorem ipsum dolor sit amet consectetur. Accumsan habitant eu
                  volutpat amet neque netus sem. Massa non massa a feugiat.
                  Ultrices sit sit sagittis urna phasellus volutpat nulla justo
                  morbi. In aliquet in tincidunt ac euismod dictum urna neque
                  lectus.
                </CardDescription>
              </CardHeader>
              <CardBg
                src="/ImgPlaceholder.svg"
                alt="image placeholder"
                className="rounded-lg"
              ></CardBg>
              <CardContent className="my-3">
                <p>Get started by clicking the button below.</p>
              </CardContent>
              <CardFooter>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                  Get Started
                </button>
              </CardFooter>
            </Card>
          </div>
          <div className="my-5">
            <h1 className="dark:text-gray-25 text-gray-900">Card Small</h1>
            <Card className="w-[711px] rounded-radius-lg p-[32px] gradientOne border-2 border-primary-500 hover:border-2 hover:border-primary-500">
              <CardHeader>
                <CardTitle className="text-[24px] font-bold leading-[36px] text-white">
                  Modal Card Title
                </CardTitle>
                <CardDescription className="my-4 text-[20px] leading-[30px]">
                  Lorem ipsum dolor sit amet consectetur. Accumsan habitant eu
                  volutpat amet neque netus sem. Massa non massa a feugiat.
                  Ultrices sit sit sagittis urna phasellus volutpat nulla justo
                  morbi. In aliquet in tincidunt ac euismod dictum urna neque
                  lectus.
                </CardDescription>
              </CardHeader>
              <CardBg src="/ImgPlaceholder.svg" className="rounded-lg"></CardBg>
              <CardContent className="my-3">
                <p>Get started by clicking the button below.</p>
              </CardContent>
              <CardFooter>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                  Get Started
                </button>
              </CardFooter>
            </Card>
          </div>
        </section>
        <section className="my-5">
          <ImageCard
            cardTitle="Modal Card Title"
            cardDesc="Lorem ipsum dolor sit amet consectetur. Accumsan."
            className="w-[466px] h-[406px] bg-primary-100"
          >
            <div className="my-2 w-[50%]">
              <Chip endIcon={<LuHeart />} variant="primary">
                Learn More
              </Chip>
            </div>
          </ImageCard>
        </section>
        <section className="my-5">
          <ImageCard
            cardTitle="Modal Card Title"
            cardDesc="Lorem ipsum dolor sit amet consectetur. Accumsan."
            className="w-[500px] h-[700px]"
            cardImg="https://images.unsplash.com/photo-1588534331122-77ac46322dd2?q=80&w=2779&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            <div className="my-2 w-[50%]">
              <Chip endIcon={<LuHeart />} variant="primary">
                Learn More
              </Chip>
            </div>
          </ImageCard>
        </section>
        <div className="my-5">
          <section>
            <h1 className="dark:text-gray-25 text-gray-900">Default</h1>
            <StatsCard
              className="w-[400px] h-[400px]"
              statTitle="Number"
              statDesc="Value Descritpion and other data Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, quos?"
              cardIcon={<LuAngry size={40} />}
            />
          </section>
          <section>
            <h1 className="dark:text-gray-25 text-gray-900">Customise</h1>
            <StatsCard
              className="w-[400px] h-[400px] bg-gradient-to-b from-indigo-500 dark:from-cyan-500 dark:to-blue-500"
              statTitle="Number"
              statDesc="Value Descritpion and other data Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, quos?"
              cardIcon={<LuAngry size={40} />}
            />
          </section>
        </div>
        <section className="my-5 space-y-3">
          <Typography variant="h6">List Pagination</Typography>
          <div className="flex flex-wrap items-center gap-4">
            {paginatedData.map((item) => (
              <Chip key={item.id}>{item.name}</Chip>
            ))}
          </div>
          <ListPagination
            count={dummyData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
          />
        </section>
        <section className="my-5">
          <Typography variant="h6">Skeleton: </Typography>
          <div className="flex flex-col gap-2">
            <Skeleton animation="wave" width="200px" height="200px" />
            <Skeleton width="200px" height="200px" circle animation="shimmer" />
            {/* Fluid text line skeletons */}
            <div className="w-[20%] min-w-[120px] max-w-[167px] h-[14px]">
              <Skeleton width="100%" height="100%" animation="pulse" />
            </div>

            <div className="w-[15%] min-w-[100px] max-w-[138px] h-[42px]">
              <Skeleton width="100%" height="100%" animation="pulse" />
            </div>
          </div>
        </section>
        {/* accordion */}
        <section className="my-5">
          <Typography variant={"h6"}>Accordion Single</Typography>
          <Button onClick={() => setIsAllExpanded(!isAllExpanded)}>
            {isAllExpanded ? "Collapse All" : "Expand All"}
          </Button>
          <Accordion
            type="single"
            collapsible
            defaultOpenValues={["item-1"]}
            className="w-full"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger
                className="text-yellow-500"
                triggerIcon={<RiAlertFill />}
              >
                What is your favorite template from BRIX Templates?
              </AccordionTrigger>
              <AccordionContent>
                {` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.`}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                {` Yes. It comes with default styles that match the other components'
              aesthetic.`}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                {` Yes. It's animated by default, but you can disable it if you
              prefer.`}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
        <section className="my-5">
          <Typography variant={"h6"}>Accordion Multiple</Typography>
          <Accordion
            expanded={isAllExpanded}
            type="multiple"
            collapsible
            className="w-full"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What is your favorite template from BRIX Templates?
              </AccordionTrigger>
              <AccordionContent>
                {` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.`}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" disabled>
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                {` Yes. It comes with default styles that match the other components'
              aesthetic.`}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                {` Yes. It's animated by default, but you can disable it if you
              prefer.`}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
        <section className="space-y-3">
          <Typography variant="h6">Buttons</Typography>
          <div className="flex items-center gap-3">
            <Paragraph variant="b2">Primary:</Paragraph>
            <Button
              size={"xs"}
              startIcon={<RiAddLine />}
              endIcon={<RiAddLine />}
            >
              Button
            </Button>
            <Button
              size={"sm"}
              startIcon={<RiAddLine />}
              endIcon={<RiAddLine />}
            >
              Button
            </Button>
            <Button
              size={"md"}
              startIcon={<RiAddLine />}
              endIcon={<RiAddLine />}
            >
              Button
            </Button>
            <Button
              size={"lg"}
              startIcon={<RiAddLine />}
              endIcon={<RiAddLine />}
            >
              Button
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Paragraph variant="b2">Primary Light:</Paragraph>
            <Button
              size={"xs"}
              variant={"primary-light"}
              startIcon={<RiAddLine />}
              endIcon={<RiAddLine />}
            >
              Button
            </Button>
            <Button
              size={"sm"}
              variant={"primary-light"}
              startIcon={<RiAddLine />}
              endIcon={<RiAddLine />}
            >
              Button
            </Button>
            <Button
              size={"md"}
              variant={"primary-light"}
              startIcon={<RiAddLine />}
              endIcon={<RiAddLine />}
            >
              Button
            </Button>
            <Button
              size={"lg"}
              variant={"primary-light"}
              startIcon={<RiAddLine />}
              endIcon={<RiAddLine />}
            >
              Button
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Paragraph variant="b2">Secondary:</Paragraph>
            <Button
              size={"xs"}
              variant={"secondary"}
              startIcon={<RiAddLine />}
              endIcon={<RiAddLine />}
            >
              Button
            </Button>
            <Button
              size={"sm"}
              variant={"secondary"}
              startIcon={<RiAddLine />}
              endIcon={<RiAddLine />}
            >
              Button
            </Button>
            <Button
              size={"md"}
              variant={"secondary"}
              startIcon={<RiAddLine />}
              endIcon={<RiAddLine />}
            >
              Button
            </Button>
            <Button
              size={"lg"}
              variant={"secondary"}
              startIcon={<RiAddLine />}
              endIcon={<RiAddLine />}
            >
              Button
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Paragraph variant="b2">Tertiary:</Paragraph>
            <Button
              size={"xs"}
              variant={"tertiary"}
              startIcon={<RiAddLine />}
              endIcon={<RiAddLine />}
            >
              Button
            </Button>
            <Button
              size={"sm"}
              variant={"tertiary"}
              startIcon={<RiAddLine />}
              endIcon={<RiAddLine />}
            >
              Button
            </Button>
            <Button
              size={"md"}
              variant={"tertiary"}
              startIcon={<RiAddLine />}
              endIcon={<RiAddLine />}
            >
              Button
            </Button>
            <Button
              size={"lg"}
              variant={"tertiary"}
              startIcon={<RiAddLine />}
              endIcon={<RiAddLine />}
            >
              Button
            </Button>
          </div>
          <div
            className="flex items-center gap-3 div-glass py-5 px-4"
            style={{ backgroundImage: `url(${nature.src})`, height: "150px" }}
          >
            <Paragraph variant="b2" className="text-light">
              Quaternary:
            </Paragraph>
            <Button
              size={"xs"}
              variant={"quaternary"}
              startIcon={<RiAddLine />}
              endIcon={<RiAddLine />}
            >
              Button
            </Button>
            <Button
              size={"sm"}
              variant={"quaternary"}
              startIcon={<RiAddLine />}
              endIcon={<RiAddLine />}
            >
              Button
            </Button>
            <Button
              size={"md"}
              variant={"quaternary"}
              startIcon={<RiAddLine />}
              endIcon={<RiAddLine />}
            >
              Button
            </Button>
            <Button
              size={"lg"}
              variant={"quaternary"}
              startIcon={<RiAddLine />}
              endIcon={<RiAddLine />}
            >
              Button
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Paragraph variant="b2">Disabled:</Paragraph>
            <Button
              size={"sm"}
              disabled
              variant={"tertiary"}
              startIcon={<RiAddLine />}
              endIcon={<RiAddLine />}
            >
              Button
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Paragraph variant="b2">Rounded:</Paragraph>
            <Button
              size={"sm"}
              rounded
              variant={"primary"}
              startIcon={<RiAddLine />}
              endIcon={<RiAddLine />}
            >
              Button
            </Button>
            <Button
              size={"sm"}
              rounded
              variant={"primary-light"}
              startIcon={<RiAddLine />}
              endIcon={<RiAddLine />}
            >
              Button
            </Button>
            <Button
              size={"sm"}
              rounded
              variant={"secondary"}
              startIcon={<RiAddLine />}
              endIcon={<RiAddLine />}
            >
              Button
            </Button>
            <Button
              size={"sm"}
              rounded
              variant={"tertiary"}
              startIcon={<RiAddLine />}
              endIcon={<RiAddLine />}
            >
              Button
            </Button>
          </div>
        </section>
        <section>
          <Typography variant="h6">Fill Button:</Typography>
          <FillButton
            label="Button"
            fillColor="bg-primary-600"
            textHoverColor="group-hover:text-white"
            icon={RiCheckLine}
            className="w-[150px]"
          />
        </section>
        <section className="flex items-center gap-5">
          <Typography variant="h6">Floating Button:</Typography>
          <Button
            onClick={() => setShowButton((prev) => !prev)}
            aria-expanded={showButton}
          >
            {showButton ? "Hide" : "Show"}
          </Button>
          {showButton && (
            <div>
              <FloatingButton
                onClick={() => alert("Button Clicked!!")}
                position="bottom-center"
                variant={"quaternary"}
                className="text-primary-500 border border-primary-500"
              >
                <RiAddLine />
              </FloatingButton>
              <FloatingButton
                onClick={() => alert("Button Clicked!!")}
                variant={"primary-light"}
                position="bottom-left"
              >
                <RiAddLine />
              </FloatingButton>
              <FloatingButton
                onClick={() => alert("Button Clicked!!")}
                position="bottom-right"
                variant={"secondary"}
              >
                <RiAddLine />
              </FloatingButton>{" "}
              <FloatingButton
                onClick={() => alert("Button Clicked!!")}
                position="top-left"
                variant={"tertiary"}
              >
                <RiAddLine />
              </FloatingButton>{" "}
              <FloatingButton
                onClick={() => alert("Button Clicked!!")}
                position="top-right"
              >
                <RiAddLine />
              </FloatingButton>
            </div>
          )}
        </section>
        <section className="space-y-5">
          <Typography variant={"h6"}>Slider: </Typography>
          <Slider
            value={sliderValue}
            min={10}
            max={200}
            onChange={(e) => handleSliderChange(Number(e.target.value))}
          />
          <Slider
            value={sliderValue}
            min={10}
            max={200}
            size="lg"
            onChange={(e) => handleSliderChange(Number(e.target.value))}
          />
        </section>
        <section className="flex flex-col items-center justify-center gap-2">
          <Typography variant={"h6"}>Loading:</Typography>
          <Loading width="50px" height="50px" loaderColor="green" />
          <span className="font-bold">Hold On ...</span>
          <p className="text-sm text-gray-500">
            We are running into some issues :&#40;
          </p>
          <Button size={"sm"}>
            Loading <Loading width="15px" height="15px" variant="light" />
          </Button>
          <Button variant="primary-light">
            Loading <Loading width="15px" height="15px" variant="heavy" />
          </Button>
        </section>
        <section className="flex items-center gap-6">
          <Typography variant={"h6"}>Spinner:</Typography>
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </section>
        <div className="flex   items-center gap-8">
          <Typography variant={"h6"}>Notice: </Typography>
          <Button onClick={() => setNotice(true)}>Show Notice</Button>
          <Notice
            open={notice}
            setOpen={setNotice}
            variant="default"
            noticeTitle="Notice on Top Left"
            position="top-left"
          />
          <Notice
            open={notice}
            setOpen={setNotice}
            variant="info"
            noticeTitle="Notice on Top Right"
            position="top-right"
            showIcon={false}
          ></Notice>
          <Notice
            open={notice}
            setOpen={setNotice}
            variant="error"
            noticeTitle="Notice on Top Center"
            position="top-center"
          />
          <Notice
            open={notice}
            setOpen={setNotice}
            variant="warning"
            noticeTitle="Notice on Bottom Center"
            position="bottom-center"
          />{" "}
          <Notice
            open={notice}
            setOpen={setNotice}
            variant="success"
            noticeTitle="Notice on Bottom Left"
            position="bottom-left"
          />{" "}
          <Notice
            open={notice}
            setOpen={setNotice}
            noticeTitle="Notice on Bottom Right"
            position="bottom-right"
          />
        </div>
        <section className="my-5">
          <Typography variant={"h6"}>Modal:</Typography>
          <Button onClick={() => setShowModal(true)}>Show Modal</Button>
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            closeModal={true}
            closeOnOutsideClick={true}
            width="60%"
          >
            <div className=" w-full">
              <Typography variant={"h4"}>Content</Typography>
              <Paragraph>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
                quisquam consequatur quis vitae blanditiis dicta iusto nesciunt
                magni. Ipsum maxime dolorem rem excepturi laboriosam voluptate
                quia, natus qui neque accusamus?
              </Paragraph>
            </div>
          </Modal>
        </section>
        <section className="my-5 space-y-4">
          <Typography variant={"h6"}>Drawer:</Typography>
          <div className="flex gap-3 flex-wrap">
            {positions.map((pos) => (
              <Button key={pos} onClick={() => setOpenPosition(pos)}>
                Show {pos} Drawer
              </Button>
            ))}
          </div>

          {positions.map((pos) => (
            <Drawer
              key={pos}
              isOpen={openPosition === pos}
              setIsOpen={(isOpen) => {
                if (!isOpen) setOpenPosition(undefined);
              }}
              closeOnOutsideClick={false}
              position={pos}
              width={pos === "left" || pos === "right" ? "w-[500px]" : ""}
              height={pos === "top" || pos === "bottom" ? "h-[500px]" : ""}
            >
              <p>This is a {pos} drawer.</p>
              <p>You can change its position, width, and height using props.</p>
            </Drawer>
          ))}
        </section>
        <section className="my-5 space-y-4">
          <Typography variant={"h6"}>Popover:</Typography>
          <div className="flex justify-center">
            <Popover
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              postion="top-center"
              trigger={<Button size={"sm"}>Show Popover</Button>}
              className="w-[500px]"
            >
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="leading-none font-medium">Dimensions</h4>
                  <p className="text-muted-foreground text-sm">
                    Set the dimensions for the layer.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Width</Label>
                    <Input
                      type="text"
                      id="width"
                      defaultValue="100%"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxWidth">Max. width</Label>
                    <Input
                      type="text"
                      id="maxWidth"
                      defaultValue="300px"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="height">Height</Label>
                    <Input
                      type="text"
                      id="height"
                      defaultValue="25px"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="maxHeight">Max. height</Label>
                    <Input
                      type="text"
                      id="maxHeight"
                      defaultValue="none"
                      className="col-span-2 h-8"
                    />
                  </div>
                </div>
              </div>
            </Popover>
          </div>
        </section>
        <section className="my-5 w-[500px] space-y-3">
          <Typography variant={"h6"}>Progress:</Typography>
          <Progress
            progressColor="bg-success"
            progress={progress}
            rounded
            height="2px"
            progressText={"Progress text on top"}
            progressTextPosition="top"
          />
          <Progress
            progressColor="bg-primary-600"
            progress={progress}
            progressText={`${progress}%`}
            progressTextPosition="right"
          />
          <Progress
            progressColor="bg-success"
            progress={progress}
            progressText={`${progress}%`}
            progressTextPosition="left"
          />
          <Progress
            progressColor="bg-success"
            progress={progress}
            progressText={"Progress text on bottom"}
            progressTextPosition="bottom"
          />
        </section>
        <section className="my-5">
          <Typography variant={"h6"}>Circular Progress:</Typography>
          <div className="flex items-center gap-5 py-10">
            <CircularProgress
              strokeLinecap="square"
              size={50}
              strokeWidth={4}
              percentage={50}
            />
            <CircularProgress
              strokeLinecap="butt"
              size={90}
              strokeWidth={10}
              text="90%"
              strokeColor="var(--success)"
              percentage={70}
            />
            <CircularProgress
              size={120}
              strokeWidth={8}
              percentage={60}
              text="60%"
              strokeLinecap="round"
              textClassName="text-primary-600 font-semibold"
            />
          </div>
        </section>
        <section>
          <Typography variant={"h6"}>Tabs:</Typography>
          <div className="my-5 space-y-4">
            <Paragraph variant={"b3"}>Default Tabs:</Paragraph>
            <TabsContainer value={value}>
              <TabList
                onChange={handleTabChange}
                ariaLabel="lab API tabs example"
                box={false}
              >
                <Tab
                  label="Item One"
                  content="(12)"
                  icon={<RiSearch2Line size={16} />}
                  value="1"
                  onChange={handleTabChange}
                  selectedTabValue={value}
                />
                <Tab
                  label="Item Two"
                  value="2"
                  onChange={handleTabChange}
                  selectedTabValue={value}
                />
                <Tab
                  label="Item Three"
                  value="3"
                  onChange={handleTabChange}
                  selectedTabValue={value}
                />
              </TabList>
              <TabPanel value="1" currentValue={value}>
                Item One Content
              </TabPanel>
              <TabPanel value="2" currentValue={value}>
                Item Two Content
              </TabPanel>
              <TabPanel value="3" currentValue={value}>
                Item Three Content
              </TabPanel>
            </TabsContainer>
            <TabsContainer
              value={value}
              position="vertical"
              className="flex gap-4"
            >
              <TabList
                onChange={handleTabChange}
                ariaLabel="Vertical tabs example"
                position="vertical"
                className="w-48"
              >
                <Tab
                  label="Item One"
                  value="1"
                  onChange={handleTabChange}
                  selectedTabValue={value}
                  position="vertical"
                />
                <Tab
                  label="Item Two"
                  value="2"
                  onChange={handleTabChange}
                  selectedTabValue={value}
                  position="vertical"
                />
              </TabList>
              <div className="flex-1">
                <TabPanel value="1" currentValue={value}>
                  Item One Content
                </TabPanel>
                <TabPanel value="2" currentValue={value}>
                  Item Two Content
                </TabPanel>
              </div>
            </TabsContainer>
          </div>
          <div className="my-5 space-y-4">
            <Paragraph variant={"b3"}>Tab with box variant:</Paragraph>
            <TabsContainer value={value}>
              <TabList
                onChange={handleTabChange}
                ariaLabel="lab API tabs example"
                box={true}
              >
                <Tab
                  label="Item One"
                  value="1"
                  content="(12)"
                  icon={<RiSearch2Line size={16} />}
                  onChange={handleTabChange}
                  selectedTabValue={value}
                />
                <Tab
                  label="Item Two"
                  value="2"
                  onChange={handleTabChange}
                  selectedTabValue={value}
                />
                <Tab
                  label="Item Three"
                  value="3"
                  onChange={handleTabChange}
                  selectedTabValue={value}
                />
              </TabList>
              <TabPanel value="1" currentValue={value}>
                Item One Content
              </TabPanel>
              <TabPanel value="2" currentValue={value}>
                Item Two Content
              </TabPanel>
              <TabPanel value="3" currentValue={value}>
                Item Three Content
              </TabPanel>
            </TabsContainer>
            <TabsContainer position="vertical" value={value}>
              <TabList
                onChange={handleTabChange}
                ariaLabel="lab API tabs example"
                box={true}
                position="vertical"
              >
                <Tab
                  label="Item One"
                  value="1"
                  content="(12)"
                  icon={<RiSearch2Line size={16} />}
                  onChange={handleTabChange}
                  selectedTabValue={value}
                />
                <Tab
                  label="Item Two"
                  value="2"
                  onChange={handleTabChange}
                  selectedTabValue={value}
                />
                <Tab
                  label="Item Three"
                  value="3"
                  onChange={handleTabChange}
                  selectedTabValue={value}
                />
              </TabList>
              <TabPanel value="1" currentValue={value}>
                Item One Content
              </TabPanel>
              <TabPanel value="2" currentValue={value}>
                Item Two Content
              </TabPanel>
              <TabPanel value="3" currentValue={value}>
                Item Three Content
              </TabPanel>
            </TabsContainer>
          </div>
          <div className="my-5 space-y-4">
            <Paragraph variant={"b3"}>Custom styling for Tabs:</Paragraph>
            <TabsContainer value={value}>
              <TabList
                onChange={handleTabChange}
                ariaLabel="lab API tabs example"
                className="border-none"
              >
                <Tab
                  label="Item One"
                  value="1"
                  // icon={<RiSearch2Line size={16} />}
                  onChange={handleTabChange}
                  selectedTabValue={value}
                  className="bg-primary-600 text-white rounded-2xl hover:bg-primary-100 hover:text-black border-b-0 hover:rounded-2xl"
                />
                <Tab
                  label="Item Two"
                  value="2"
                  onChange={handleTabChange}
                  selectedTabValue={value}
                />
                <Tab
                  label="Item Three"
                  value="3"
                  onChange={handleTabChange}
                  selectedTabValue={value}
                />
              </TabList>
              <TabPanel value="1" currentValue={value}>
                Item One Content
              </TabPanel>
              <TabPanel value="2" currentValue={value}>
                Item Two Content
              </TabPanel>
              <TabPanel value="3" currentValue={value}>
                Item Three Content
              </TabPanel>
            </TabsContainer>
          </div>
        </section>
        <section className="my-5 space-y-4">
          <Typography variant={"h6"}>Callout:</Typography>
          <div className="space-y-3">
            <h1 className="text-display-xs text-primary-600">Filled:</h1>
            <Callout
              size={"xs"}
              startIcon={<RiInformationLine size={18} />}
              endIcon={<RiCloseLine size={18} />}
            >
              Access denied. Please contact the network administrator to view
              this page.
            </Callout>
            <Callout
              size={"sm"}
              intent={"warning"}
              startIcon={<RiInformationLine size={18} />}
              endIcon={<RiCloseLine size={18} />}
            >
              Access denied. Please contact the network administrator to view
              this page.
            </Callout>
            <Callout
              size={"md"}
              intent={"error"}
              startIcon={<RiInformationLine size={20} />}
              endIcon={<RiCloseLine size={20} />}
            >
              Access denied. Please contact the network administrator to view
              this page.
            </Callout>
            <Callout
              size={"lg"}
              intent={"success"}
              startIcon={<RiInformationLine size={20} />}
              endIcon={<RiCloseLine size={20} />}
            >
              Access denied. Please contact the network administrator to view
              this page.
            </Callout>
            <Callout
              size={"lg"}
              intent={"default"}
              startIcon={<RiInformationLine size={20} />}
              endIcon={<RiCloseLine size={20} />}
            >
              Access denied. Please contact the network administrator to view
              this page.
            </Callout>
            <h1 className="text-display-xs text-primary-600">Outlined:</h1>
            <Callout
              size={"md"}
              variant={"outlined"}
              startIcon={<RiInformationLine size={18} />}
              endIcon={<RiCloseLine size={20} />}
            >
              Access denied. Please contact the network administrator to view
              this page.
            </Callout>
            <Callout
              size={"sm"}
              variant={"outlined"}
              intent={"warning"}
              startIcon={<RiInformationLine size={18} />}
              endIcon={<RiCloseLine size={18} />}
            >
              Access denied. Please contact the network administrator to view
              this page.
            </Callout>
            <Callout
              size={"md"}
              variant={"outlined"}
              intent={"error"}
              startIcon={<RiInformationLine size={20} />}
              endIcon={<RiCloseLine size={20} />}
            >
              Access denied. Please contact the network administrator to view
              this page.
            </Callout>
            <Callout
              size={"lg"}
              variant={"outlined"}
              intent={"success"}
              startIcon={<RiInformationLine size={20} />}
              endIcon={<RiCloseLine size={18} />}
            >
              Access denied. Please contact the network administrator to view
              this page.
            </Callout>
            <Callout
              size={"lg"}
              variant={"outlined"}
              intent={"default"}
              startIcon={<RiInformationLine size={20} />}
              endIcon={<RiCloseLine size={20} />}
            >
              Access denied. Please contact the network administrator to view
              this page.
            </Callout>
          </div>
        </section>
      </main>
      <Footer
        footerBottom={
          <Caption variant={"md"}>
            Made With Love By Atomos Tech All Right Reserved
          </Caption>
        }
      >
        <FooterContent>
          <FooterHeader>
            <div className="w-[124px] h-[54px] bg-primary-300"></div>
            <Paragraph variant={"b3"} className="text-center md:text-left">
              Atomos Technologies, backed by Mirats, delivers innovative digital
              services, IT solutions, and business consulting
            </Paragraph>
            <FooterIcons icons={iconsArray} />
          </FooterHeader>
          <FooterList footerItems={footerItems} />
        </FooterContent>
      </Footer>
    </div>
  );
};

export default Test;
