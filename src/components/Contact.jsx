import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaCalendarAlt } from "react-icons/fa";
import { LucideClock } from "lucide-react";

import SectionHeading from "./SectionHeading";
import Button from "./Button";

function Contact({ getDirection }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const targetPhoneNumber = "93788134182";

    const messageTemplate = `Hello! I would like to book an appointment.

    *Name:* ${data.fullName}
    *Phone:* ${data.phone}
    *Email:* ${data.email || "N/A"}
    *Preferred Time:* ${data.appointmentTime || "N/A"}
    *Message:* ${data.comments || "N/A"}`;

    const encodedMessage = encodeURIComponent(messageTemplate);
    const whatsappURL = `https://wa.me/${targetPhoneNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");

    setIsSubmitted(true);
    reset();

    setTimeout(() => {
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <section
      id="contact"
      dir={getDirection ? getDirection() : "ltr"}
      className="px-4 sm:px-6 xl:px-24 pt-6 lg:pt-10"
    >
      <div className="mx-auto space-y-8 lg:space-y-12 py-8 lg:py-14 px-4 sm:px-6 xl:px-12 bg-colors-primary-50 rounded-xl">
        {/* Section Heading */}
        <SectionHeading title={t("contactPageTitle")} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
          {/* Left Column: Image with Working Hours Badge */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative w-full h-[280px] sm:h-[350px] lg:h-full min-h-[280px] rounded-xl overflow-hidden shadow-sm border border-colors-primary-100 bg-colors-bg">
              <img
                src="/images/contact-us-image.webp"
                alt={t("contactImageAlt")}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-colors-primary-500/60 via-transparent to-transparent" />

              {/* Floating Working Hours Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-sm border border-white/50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-colors-accent-500 text-white flex items-center justify-center shrink-0">
                  <LucideClock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-title font-bold text-sm text-colors-textDarkColor">
                    {t("workingHoursTitle")}
                  </h4>
                  <p className="font-body text-xs text-colors-textLightGray">
                    {t("workingHoursText")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Appointment Form */}
          <div className="lg:col-span-7 bg-white rounded-xl p-6 sm:p-8 lg:p-10 border border-colors-primary-100 shadow-sm">
            <form
              className="flex flex-col gap-4 lg:gap-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* Full Name */}
                <div className="space-y-2 w-full sm:w-1/2">
                  <label
                    htmlFor="fullName"
                    className="text-sm lg:text-base font-title font-bold text-colors-textDarkColor"
                  >
                    {t("fullName")}
                  </label>
                  <input
                    placeholder={t("fullNamePlaceholder")}
                    id="fullName"
                    type="text"
                    className={`input w-full ${errors.fullName ? "!border-red-500" : ""}`}
                    {...register("fullName", {
                      required: t("nameError"),
                    })}
                  />
                  {errors.fullName && (
                    <p className="error text-xs text-red-500">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-2 w-full sm:w-1/2">
                  <label
                    htmlFor="phone"
                    className="text-sm lg:text-base font-title font-bold text-colors-textDarkColor"
                  >
                    {t("phoneNumber")}
                  </label>
                  <input
                    placeholder={t("phonePlaceholder")}
                    type="tel"
                    id="phone"
                    className={`input w-full ${errors.phone ? "!border-red-500" : ""}`}
                    {...register("phone", {
                      required: t("phoneError"),
                      minLength: {
                        value: 9,
                        message: t("phoneInvalid"),
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="error text-xs text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* Email */}
                <div className="space-y-2 w-full sm:w-1/2">
                  <label className="text-sm lg:text-base font-title font-bold text-colors-textDarkColor">
                    {t("userEmail")}
                  </label>
                  <input
                    placeholder={t("emailPlaceholder")}
                    type="email"
                    autoComplete="off"
                    className={`input w-full ${errors.email ? "!border-red-500" : ""}`}
                    {...register("email", {
                      required: t("emailError"),
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: t("emailInvalid"),
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="error text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Preferred Appointment Time */}
                <div className="space-y-2 w-full sm:w-1/2">
                  <label
                    htmlFor="appointmentTime"
                    className="text-sm lg:text-base font-title font-bold text-colors-textDarkColor"
                  >
                    {t("formPreferredTime")}
                  </label>
                  <input
                    type="time"
                    id="appointmentTime"
                    className="input w-full"
                    {...register("appointmentTime")}
                  />
                </div>
              </div>

              {/* Comments / Message */}
              <div className="space-y-2 w-full">
                <label
                  htmlFor="comments"
                  className="text-sm lg:text-base font-title font-bold text-colors-textDarkColor"
                >
                  {t("comments")}
                </label>
                <textarea
                  placeholder={t("commentsPlaceholder")}
                  id="comments"
                  className="input w-full h-28 lg:h-36 resize-none"
                  {...register("comments")}
                ></textarea>
              </div>

              {/* Submit Button Component */}
              <div className="pt-2 flex justify-start">
                <Button
                  type="submit"
                  variant="primary"
                  icon={FaCalendarAlt}
                  text={t("hero.book_appointment")}
                />
              </div>

              {isSubmitted && (
                <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg text-sm mt-2 text-center">
                  {t("successMessage")}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
