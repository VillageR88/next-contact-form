'use client';
import { InputHTMLAttributes, useEffect, useState } from 'react';
import { CreateInvoiceContactForm } from '@/app/_lib/functionsServer';
import { useFormState, useFormStatus } from 'react-dom';
import Loader from './components/Loader';

enum BoxType {
  text,
  email,
  textarea,
  radioButtons,
}

export default function Home() {
  const [state, action] = useFormState<number, FormData>(CreateInvoiceContactForm, 0);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  useEffect(() => {
    if (state !== currentNumber) {
      setCurrentNumber(state);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 7000);
    }
  }, [state, currentNumber]);

  const Box = ({
    boxType,
    id,
    type,
    title,
    children,
  }: {
    boxType: BoxType;
    id: string;
    type: InputHTMLAttributes<HTMLInputElement>['type'] | undefined;
    title: string;
    children?: React.ReactNode;
  }) => {
    return (
      <div className={`flex w-full flex-col ${boxType !== BoxType.radioButtons ? 'gap-[8px]' : 'gap-[16px]'}`}>
        {boxType !== BoxType.radioButtons ? (
          <label className={`flex w-fit gap-[8px] hover:cursor-pointer`} htmlFor={id}>
            <span>{title}</span>
            <span className="text-[#0C7D69]">*</span>
          </label>
        ) : (
          <div className="flex w-fit gap-[8px]">
            <span>{title}</span>
            <span className="text-[#0C7D69]">*</span>
          </div>
        )}
        {boxType === BoxType.text && (
          <input
            id={id}
            type={type}
            name={id}
            className="h-[51px] rounded-[8px] px-[24px] outline outline-1 outline-[#86A2A5] transition-colors hover:outline-[#0C7D69] focus:outline-[#0C7D69]"
            required
          />
        )}
        {boxType === BoxType.email && (
          <input
            id={id}
            type={type}
            name={id}
            className="h-[51px] rounded-[8px] px-[24px] outline outline-1 outline-[#86A2A5] transition-colors hover:outline-[#0C7D69] focus:outline-[#0C7D69]"
            required
            autoComplete="email"
            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          />
        )}
        {boxType === BoxType.textarea && (
          <textarea
            id={id}
            name={id}
            className="h-[105px] resize-none rounded-[8px] px-[24px] py-[12px] outline outline-1 outline-[#86A2A5] focus:outline-[#0C7D69]"
            required
          />
        )}
        {boxType === BoxType.radioButtons && <div className="flex flex-col gap-[16px] tablet:flex-row">{children}</div>}
      </div>
    );
  };

  const RadioInput = ({ id, title }: { id: string; title: string }) => {
    return (
      <label className="groupParent flex h-[51px] w-full cursor-pointer items-center gap-[12px] rounded-[8px] pl-[24px] outline outline-1 outline-[#86A2A5] transition">
        <input required className="size-[24px] hover:cursor-pointer" type="radio" id={id} name="queryType" />
        <label className="labelSpan hover:cursor-pointer" htmlFor={id}>
          {title}
        </label>
      </label>
    );
  };

  const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
      <button
        disabled={pending}
        type="submit"
        className="flex h-[59px] w-full items-center justify-center gap-4 rounded-[8px] bg-[#0C7D69] text-[18px] font-bold leading-[150%] text-[#FFFFFF] transition-colors hover:bg-[#2A4144]"
      >
        <span>{pending ? 'Submitting' : 'Submit'}</span>
        <Loader pending={pending} />
      </button>
    );
  };

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center p-6 font-karla sm:min-h-screen">
      <div
        className={`${showMessage ? '' : '-translate-y-44'} fixed inset-0 flex h-fit justify-center px-[24px] transition-transform duration-500`}
      >
        <div className="mt-[24px] flex size-full h-fit min-h-[107px] max-w-[450px] flex-col gap-[8px] rounded-[12px] bg-[#2A4144] p-[24px]">
          <div className="flex items-center gap-[8px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" fill="none" viewBox="0 0 20 21">
              <path
                fill="#fff"
                d="M14.28 7.72a.748.748 0 0 1 0 1.06l-5.25 5.25a.748.748 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l1.72 1.72 4.72-4.72a.75.75 0 0 1 1.06 0Zm5.47 2.78A9.75 9.75 0 1 1 10 .75a9.76 9.76 0 0 1 9.75 9.75Zm-1.5 0A8.25 8.25 0 1 0 10 18.75a8.26 8.26 0 0 0 8.25-8.25Z"
              />
            </svg>
            <span className="text-[18px] font-bold leading-[150%] text-[#FFFFFF]">Message Sent!</span>
          </div>
          <span className="text-[16px] leading-[150%] text-[#E0F1E8]">
            Thanks for completing the form. We’ll be in touch soon!
          </span>
        </div>
      </div>
      <form
        action={action}
        id="contact-form"
        className="flex size-full max-w-[736px] flex-col gap-[40px] rounded-[16px] bg-[#FFFFFF] p-[24px] tablet:p-[40px]"
      >
        <div className="flex flex-col gap-[32px]">
          <h1>Contact Us</h1>
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[16px] tablet:flex-row">
              <Box boxType={BoxType.text} id="firstName" title="First Name" type="text" />
              <Box boxType={BoxType.text} id="lastName" title="Last Name" type="text" />
            </div>
            <Box boxType={BoxType.email} id="email" title="Email Address" type="email" />
            <Box type={undefined} id="queryType" title="Query Type" boxType={BoxType.radioButtons}>
              <RadioInput id="generalInquiry" title="General Enquiry" />
              <RadioInput id="supportRequest" title="Support Request" />
            </Box>
            <Box boxType={BoxType.textarea} id="message" title="Message" type={undefined} />
          </div>
        </div>
        <label className="flex w-fit items-center gap-[16px] hover:cursor-pointer">
          <label className="checkboxWrapper flex hover:cursor-pointer">
            <svg
              className="checkboxImage"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                fill="#0C7D69"
                d="M16.5 0h-15A1.5 1.5 0 0 0 0 1.5v15A1.5 1.5 0 0 0 1.5 18h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 16.5 0Zm-3.22 7.28-5.25 5.25a.748.748 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l1.72 1.72 4.72-4.72a.751.751 0 0 1 1.06 1.06Z"
              />
            </svg>
            <input required className="hover:cursor-pointer" id="checkbox" type="checkbox" />
          </label>
          <label className="flex gap-[4px] hover:cursor-pointer" htmlFor="checkbox">
            <span className="space-x-1">
              <span>I consent to being contacted by the team</span>
              <span className="text-[#0C7D69]">*</span>
            </span>
          </label>
        </label>
        <SubmitButton />
      </form>
    </main>
  );
}
