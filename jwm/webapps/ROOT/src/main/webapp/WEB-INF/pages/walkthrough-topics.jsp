<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" isELIgnored="true" %>
<%@ taglib prefix="rv" tagdir="/WEB-INF/tags" %>
<% boolean homePage = false; boolean picksPage = false; %>
<%@ include file="/WEB-INF/shared/head-start.jspf" %>
<%@ include file="/WEB-INF/heads/walkthrough-topics.jspf" %>
<link rel="stylesheet" href="assets/css/topic-picker.css">
<link rel="stylesheet" href="assets/css/walkthrough-topics.css">
</head>
<body class="walkthrough-topics-page">
<a class="skip-link" href="#main">Skip to content</a>
<%@ include file="/WEB-INF/shared/header.jspf" %>
<%@ include file="/WEB-INF/pages/content/walkthrough-topics.jspf" %>
<%@ include file="/WEB-INF/shared/footer.jspf" %>
<%@ include file="/WEB-INF/shared/scripts.jspf" %>
<script src="assets/js/walkthrough-topics.js" defer></script>
</body>
</html>
