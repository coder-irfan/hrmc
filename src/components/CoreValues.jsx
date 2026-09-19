import { useTranslation } from "react-i18next";
import {
  FiCheckCircle,
  FiCpu,
  FiSmile,
  FiUsers,
  FiShield,
} from "react-icons/fi";

const coreValuesData = [
  { id: "1", key: "integrity", icon: FiShield },
  { id: "2", key: "quality", icon: FiCheckCircle },
  { id: "3", key: "innovation", icon: FiCpu },
  { id: "4", key: "clientFocus", icon: FiSmile },
  { id: "5", key: "teamwork", icon: FiUsers },
  { id: "6", key: "sustainability", icon: FiShield },
];

function CoreValues({ getDirection }) {
  const { t } = useTranslation();
  const isRTL = getDirection ? getDirection() === "rtl" : false;

  return (
    <section
      id="core-values"
      dir={getDirection ? getDirection() : "ltr"}
      className="px-4 sm:px-6 md:px-8 lg:px-16 py-14 md:py-14 lg:py-24 bg-colors-bg"
    >
      <div className="space-y-8 lg:space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div
            className={`inline-block tracking-wider ${
              isRTL ? "border-r-4" : "border-l-4"
            } border-colors-primaryColorDarkesh`}
          >
            <span className="mx-4 font-medium md:text-lg lg:text-xl">
              {t("coreValuesSubtitle")}
            </span>
          </div>

          <h2 className="text-h2 font-bold">
            {t("coreValuesTitle")}{" "}
            <span className="text-colors-primaryColorDark">
              {t("coreValuesHighlight")}
            </span>
          </h2>

          <p className="text-sm md:text-base text-colors-textDarkGray text-center max-w-2xl mx-auto">
            {t("coreValuesDescription")}
          </p>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {coreValuesData.map((value, index) => {
            const Icon = value.icon;
            // Alternates background opacity matching your sample logic
            const isEven = index % 2 === 0;

            return (
              <div
                key={value.id}
                className={`p-6 text-center flex flex-col items-center justify-center gap-4 lg:gap-6 rounded-lg transition-all duration-300 shadow-sm hover:shadow-lg border border-colors-thirdBg/30 ${
                  isEven ? "bg-colors-bg" : "bg-colors-primaryColorDark/15"
                }`}
              >
                <div className="p-3 rounded-full bg-colors-bg shadow-md">
                  <Icon className="text-3xl lg:text-4xl text-colors-primaryColorDark" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-h3 text-colors-textDarkColor font-bold">
                    {t(`coreValues.${value.key}.title`)}
                  </h3>

                  <p className="text-sm sm:text-base text-colors-textDarkGray leading-relaxed">
                    {t(`coreValues.${value.key}.description`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CoreValues;
