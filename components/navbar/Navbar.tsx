import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import { MobileMenu } from "./MobileMenu";
import { NavbarItem } from "./NavbarItem";
import { useState, useCallback, useEffect, useRef } from "react";
import { menuData } from "./data";
import { AccountMenu } from "./AccountMenu";
import { useRouter } from "next/router";

type Props = {};

const TOP_OFFSET = 66;

export const Navbar = (props: Props) => {
  const [showMobMenu, setShowMobMenu] = useState<boolean>(false);
  const [showAccMenu, setShowAccMenu] = useState<boolean>(false);
  const [showBackground, setShowBackground] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const toggleMobMenu = useCallback(() => {
    setShowMobMenu((current) => !current);
  }, []);
  const toggleAccMenu = useCallback(() => {
    setShowAccMenu((current) => !current);
  }, []);

  const handleSearchClick = useCallback(() => {
    setShowSearch((current) => !current);
    if (!showSearch) {
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }
  }, [showSearch]);

  const handleSearch = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput)}`);
      setShowSearch(false);
      setSearchInput("");
    } else if (e.key === "Escape") {
      setShowSearch(false);
      setSearchInput("");
    }
  }, [searchInput, router]);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY >= TOP_OFFSET
        ? setShowBackground(true)
        : setShowBackground(false);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
          showBackground ? "bg-zing-900 bg-opacity-90" : ""
        } `}
      >
        <img className="h-4 lg:h-7" src="/images/logo.png" alt="logo" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          {menuData.map((item) => (
            <NavbarItem label={item.text} key={item.id} />
          ))}
        </div>
        <div
          onClick={toggleMobMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div 
            onClick={handleSearchClick}
            className="text-gray-200 hover:text-gray-300 cursor-pointer transition relative"
          >
            {showSearch ? (
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearch}
                onBlur={() => setTimeout(() => setShowSearch(false), 200)}
                className="bg-gray-800 text-white px-3 py-1 rounded text-sm focus:outline-none"
              />
            ) : (
              <BsSearch />
            )}
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>
          <div
            onClick={toggleAccMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="default-blue" />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};
