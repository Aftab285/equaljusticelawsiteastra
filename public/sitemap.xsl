<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | Equal Justice Lawyers</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background-color: #0d1912;
            color: #dfd8cb;
            margin: 0;
            padding: 30px 20px;
          }
          .container {
            max-width: 1100px;
            margin: 0 auto;
            background: #122119;
            border: 1px solid rgba(200, 160, 74, 0.35);
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 16px 40px rgba(0,0,0,0.5);
          }
          .header {
            border-bottom: 2px solid #c8a04a;
            padding-bottom: 20px;
            margin-bottom: 25px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 15px;
          }
          h1 {
            color: #ffffff;
            font-size: 24px;
            margin: 0 0 6px 0;
            font-weight: 700;
            letter-spacing: 0.02em;
          }
          p.lead {
            margin: 0;
            color: #a8b3ac;
            font-size: 14px;
          }
          .badge {
            background: #c8a04a;
            color: #0d1912;
            font-weight: 700;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 13px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
          }
          th {
            background: #172d22;
            color: #c8a04a;
            text-align: left;
            padding: 12px 14px;
            font-weight: 600;
            border-bottom: 1px solid rgba(200, 160, 74, 0.3);
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 0.05em;
          }
          td {
            padding: 12px 14px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            word-break: break-all;
          }
          tr:hover td {
            background: rgba(200, 160, 74, 0.08);
          }
          a {
            color: #ffffff;
            text-decoration: none;
            transition: color 0.2s;
          }
          a:hover {
            color: #c8a04a;
            text-decoration: underline;
          }
          .count-box {
            font-size: 13px;
            color: #a8b3ac;
            margin-top: 20px;
            text-align: right;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div>
              <h1>Equal Justice Lawyers — XML Sitemap</h1>
              <p class="lead">Search engine indexing directory generated for Google, Bing, and major search crawlers.</p>
            </div>
            <span class="badge">Official Sitemap</span>
          </div>

          <xsl:if test="sitemap:sitemapindex">
            <table>
              <thead>
                <tr>
                  <th>Sitemap URL</th>
                  <th>Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                  <tr>
                    <td>
                      <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                    </td>
                    <td><xsl:value-of select="sitemap:lastmod"/></td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </xsl:if>

          <xsl:if test="sitemap:urlset">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Indexed URL (Canonical)</th>
                  <th>Change Frequency</th>
                  <th>Priority</th>
                  <th>Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td style="color: #c8a04a; font-weight: 600;"><xsl:value-of select="position()"/></td>
                    <td>
                      <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                    </td>
                    <td><xsl:value-of select="sitemap:changefreq"/></td>
                    <td><xsl:value-of select="sitemap:priority"/></td>
                    <td><xsl:value-of select="sitemap:lastmod"/></td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </xsl:if>

          <div class="count-box">
            Equal Justice Lawyers LLP • California Statewide Legal Representation
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
