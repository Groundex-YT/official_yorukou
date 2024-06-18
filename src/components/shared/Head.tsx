import React from "react";
import NextHead from "next/head";
import { useRouter } from "next/router";

interface HeadProps {
  title?: string;
  description?: string;
  image?: string;
}

const WEBSITE_URL = "Non";

const Head: React.FC<HeadProps> = (props) => {
  const {
    title = "Yorukou",
    description = "Website only made for fun and nothing more. Come and watch free both dubbed and subbed anime provided by various providers such as Zoro and so more.",
    image = "https://lh3.googleusercontent.com/pw/AIL4fc-DCUv3QJkHh6C9kZp12gE5StEM9cnsBEotomKPBkzYftoysyutb7dvWwLxXrNSmfx7UOzX8EcSp9EumKGyUrlfg8EsyPrHfcBzhscxNDY7UJibZcaAfPDws38xOED2ixkjBtwzep7P3xdWcGbjNXsrzuJN3UNsK8fEGi7C_S6ESN_3Qn6QOGs0T_BKgLNpmHByjzXvTWcbzq3IjtgV4O6sQha1wK7pvao4pmR9IdcNVvqLUd4PLo_JIDdSqlJcLE4UFVbkiYwsB2gPkhcyfqncci-uAfbaXyTITK44m_ibSuCFMMIs27fPk8idaCZ_cXLcL0tHDqDvudqEGnTFC6FunRPo1oyLaQWMQA4nAJu5StSjsteN87peRZtATdyBXbrR7mwpDv1uNPzvewp9n5aokpgWsQwJ3YVucU8mtvWlr0j2oCbOnk3xGRLDKgMGoS62mN-8QDTEFpT0HtD6TcPgDvZshRp14Jkl57CiEvWxc6mYwIra7Pl0gy5DD5mxmWS-fE_GM5_QSW7AFZEkqi_uFMzSWXcgDlkUVpeE4FRyydiW7wLYgGrWvalcO97D3jQiYv8yHw5RcH5aYgW6-sM1kD4lVAR4VffpHQU2VYkATd6Xh7Pvh_vnAG5tDTZ117_0kQQej73DWJDdUQaA8oz9ATdQXMkjZNCUK7fBweqwJVc8tZXWs5KxFEKb9N3alFqKB6Agw5sxZennAJcTwZ5Q3hsvdhHB-AF30FoQq0Uwqjo-c3bCmwSFL11FIdfIdS4KLztAiTkM0VeI0G-7_45CK4704e8wly4AzNPjk0ccjGrG83d1KLtkdaDPSDWtV2xJSsc6om3cOvnF8CUVNRrNU8f4QwA2lxN5cwr6g0KKUsCJGMgzEI_pwY7Z9fT6dQTD4CzPattWT1wg72hjBQlM8zu9vdONyDma0XFfoqfgFrmyO4zIeXsmtaHUXbBBzH9X-Thio8pEd7rG-x7XFjeN5t2wZxE=w1854-h937-s-no?authuser=0",
  } = props;

  const { asPath } = useRouter();

  return (
    <NextHead>
      <title>{title}</title>
      <link rel="manifest" href="/manifest.json" />

      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={WEBSITE_URL + asPath} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={WEBSITE_URL + asPath} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="Yorukou" />
      <meta name="apple-mobile-web-app-title" content="Yorukou" />
      <meta name="theme-color" content="1F2937" />
      <meta name="msapplication-navbutton-color" content="1F2937" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="msapplication-starturl" content="/" />
    </NextHead>
  );
};

export default Head;
