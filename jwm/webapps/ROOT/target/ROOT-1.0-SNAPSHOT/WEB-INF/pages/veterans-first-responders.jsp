<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" isELIgnored="true" %>
<% boolean homePage = false; boolean picksPage = false; %>
<%@ include file="/WEB-INF/shared/head-start.jspf" %>
<title>Veterans &amp; First Responders Discount | Professor Jerry RV</title>
<meta name="description" content="Veterans and first responders receive 10% off regular prices on RV services.">
<link rel="stylesheet" href="assets/css/services.css">
<link rel="stylesheet" href="assets/css/topic-picker.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<%@ include file="/WEB-INF/shared/header.jspf" %>
<main id="main">
  <section class="section">
    <div class="container">
      <h1>Service Discount</h1>
      <%@ include file="/WEB-INF/services/veterans-first-responders.jspf" %>
      <div class="button-row">
        <a class="button" href="index.html#contact">Contact Professor Jerry</a>
        <a class="button button-dark" href="services.html">Explore services</a>
      </div>
    </div>
  </section>
</main>
<%@ include file="/WEB-INF/shared/footer.jspf" %>
<%@ include file="/WEB-INF/shared/scripts.jspf" %>
</body>
</html>
