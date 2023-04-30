import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import "./style.css";

function App() {
  const alphabets = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [glossaries, setGlossaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [alphabet, setAlphabet] = useState("#");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // fetchdata
    fetch("https://cms.businessintegritymyanmar.thibi.co/api/glossaries", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data);
        setGlossaries(data.data);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  let filterGlossaries = [];
  if (alphabet === "#") {
    filterGlossaries = [...glossaries];
  } else {
    filterGlossaries = glossaries.filter(
      (glossary) =>
        glossary["attributes"]["en_term"][0].toUpperCase() === alphabet
    );
  }

  return (
    <main className="h-screen">
      <header className="h-8per flex justify-between items-center px-8 sm:px-16 text-white bg-secondary">
        <div>
          <img src="./img/thibi_logo.svg" className="w-24 sm:w-32" alt="" />
        </div>
        <div>
          <span
            onClick={() => i18n.changeLanguage("en")}
            className="cursor-pointer font-kantumruy"
          >
            En
          </span>{" "}
          |{" "}
          <span
            onClick={() => i18n.changeLanguage("mm")}
            className="cursor-pointer font-padauk"
          >
            မြန်မာ
          </span>
        </div>
      </header>
      <section className="h-1/5 sm:h-15per flex flex-col justify-evenly text-center bg-gray-100">
        <div
          className={`text-xl sm:text-2xl font-bold ${
            i18n.language === "en" ? "font-kantumruy" : "font-padauk"
          }`}
        >
          {t("title")}
        </div>
        <div
          className={`px-8 text-sm sm:text-base text-gray-700 ${
            i18n.language === "en" ? "font-kantumruy" : "font-padauk"
          }`}
        >
          {t("description")}
        </div>
      </section>
      <section className="h-62per sm:h-67per flex flex-col items-center bg-gray-100">
        <div className="w-4/5 sm:w-3/5 mx-10 overflow-x-auto myscrollbar">
          <div className="flex xl:justify-center gap-x-4 text-sm sm:text-lg">
            {alphabets.map((elt) => (
              <div key={elt}>
                <span
                  onClick={() => setAlphabet(elt)}
                  className={`${
                    elt === alphabet ? "text-blue-800 font-bold underline" : ""
                  } cursor-pointer font-kantumruy`}
                >
                  {elt}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-4/5 sm:w-3/5 mt-4 px-8 sm:px-16 py-1 sm:py-2 text-sm sm:text-xl text-white rounded-t-lg bg-primary">
          {alphabet}
        </div>
        <div className="w-4/5 sm:w-3/5 flex-1 flex flex-col px-8 sm:px-16 pt-4 pb-8 gap-y-5 overflow-auto myscrollbar text-sm sm:text-lg bg-white rounded-b-lg">
          <div id="start"></div>
          {error && <div>Could not load the content.</div>}
          {loading ? (
            <div>Loading...</div>
          ) : filterGlossaries.length > 0 ? (
            filterGlossaries.map((glossary) => (
              <div key={glossary["id"]}>
                <div className="underline font-kantumruy font-bold">
                  {glossary["attributes"]["en_term"]}
                </div>
                <div className="mt-2 font-padauk text-gray-600">
                  {glossary["attributes"]["mm_term"]}
                </div>
              </div>
            ))
          ) : (
            <div>No Glossary</div>
          )}
        </div>
        <div className="my-2 sm:my-4">
          <a
            href="#start"
            className={`underline text-sm sm:text-lg cursor-pointer ${
              i18n.language === "en" ? "font-kantumruy" : "font-padauk"
            }`}
          >
            {t("gotoTop")}
          </a>
        </div>
      </section>
      <footer className="h-10per px-8 sm:px-16 flex flex-col justify-center text-white bg-secondary">
        <div className="flex justify-between items-center">
          <div>
            <img src="./img/thibi_logo.svg" className="w-24 sm:w-32" alt="" />
          </div>
          <div>
            <span
              className={`underline cursor-pointer ${
                i18n.language === "en" ? "font-kantumruy" : "font-padauk"
              }`}
            >
              {t("contact")}
            </span>
          </div>
        </div>
        <div className="font-kantumruy text-center text-sm">
          @2023, All Right Reserved.
        </div>
      </footer>
    </main>
  );
}

export default App;
