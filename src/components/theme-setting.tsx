'use client';
import React from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { createClient } from "../../prismicio";

const ThemeSetting = () => {
  const { setTheme, theme } = useTheme();
  const [settingOpen, setSettingOpen] = React.useState(false);
  const [prismicData, setPrismicData] = React.useState<{
    title: string;
    iconImage: string | null;
  }>({
    title: "Theme Settings",
    iconImage: null
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const client = createClient();
        const homepage = await client.getSingle("homepage");
        
        setPrismicData({
          title: homepage.data.theme_settings_title || "Theme Settings",
          iconImage: homepage.data.theme_settings_icon || null
        });
        
      } catch (error) {
        console.error('Failed to fetch Prismic data:', error);
      }
    };

    fetchData();
  }, []);

  function handleOpenSetting() {
    setSettingOpen(!settingOpen);
  };
  return (
    <div
      className={`tp-theme-settings-area transition-3 ${
        settingOpen ? "settings-opened" : ""
      }`}
    >
      <div className="tp-theme-wrapper">
        <div className="tp-theme-header text-center">
          <h4 className="tp-theme-header-title">{prismicData.title}</h4>
        </div>

        <div className="tp-theme-dir mb-20">
          <label className="tp-theme-dir-main" htmlFor="tp-dir-toggler">
            <span
              onClick={() => setTheme("dark")}
              className={`tp-theme-dir-rtl ${theme === "dark" ? "active" : ""}`}
            >
              Dark
            </span>
            <input type="checkbox" id="tp-dir-toggler" checked={theme === "dark"} readOnly />
            <i className="tp-theme-dir-slide"></i>
            <span
              onClick={() => setTheme("light")}
              className={`tp-theme-dir-ltr ${
                theme === "light" ? "active" : ""
              }`}
            >
              Light
            </span>
          </label>
        </div>

        <div className="tp-theme-settings">
          <div className="tp-theme-settings-wrapper">
            <div className="tp-theme-settings-open">
              <button
                className="tp-theme-settings-open-btn"
                onClick={handleOpenSetting}
              >
                <span className="tp-theme-settings-gear">
                  {prismicData.iconImage ? (
                    <Image
                      src={prismicData.iconImage}
                      alt="Settings icon"
                      width={24}
                      height={24}
                      className="theme-settings-icon-img"
                    />
                  ) : (
                    <i className="fa-light fa-gear"></i>
                  )}
                </span>
                <span className="tp-theme-settings-close">
                  <i className="fa-regular fa-xmark"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSetting;
