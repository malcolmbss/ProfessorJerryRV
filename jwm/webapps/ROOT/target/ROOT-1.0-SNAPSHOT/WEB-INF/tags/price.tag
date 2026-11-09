<%@ tag trimDirectiveWhitespaces="true" %>
<%@ attribute name="regular" type="java.lang.Integer" required="true" %>
<%@ attribute name="discount" type="java.lang.Integer" required="true" %>
<%@ attribute name="walkthrough" type="java.lang.Boolean" %>
<%@ attribute name="prefix" %>
<%@ attribute name="suffix" %>
<%@ attribute name="regularNote" %>
<%
    int regularPrice = (Integer) jspContext.getAttribute("regular");
    int discountPercent = (Integer) jspContext.getAttribute("discount");
    boolean walkthroughPrice = Boolean.TRUE.equals(jspContext.getAttribute("walkthrough"));
    String pricePrefix = java.util.Objects.toString(jspContext.getAttribute("prefix"), "");
    String priceSuffix = java.util.Objects.toString(jspContext.getAttribute("suffix"), "");
    String note = (String) jspContext.getAttribute("regularNote");
    java.text.NumberFormat dollars = java.text.NumberFormat.getIntegerInstance(java.util.Locale.US);
    String regularAmount = pricePrefix + "$" + dollars.format(regularPrice) + priceSuffix;
    String saleAmount = pricePrefix + "$" + dollars.format(regularPrice * (100L - discountPercent) / 100) + priceSuffix;
%>
<% if (!walkthroughPrice) { %><span class="service-price-pair"><% } %><s class="<%= walkthroughPrice ? "rv-price-card__regular" : "service-price-regular" %>"><span class="sr-only">Regular price </span><%= regularAmount %></s><% if (note != null) { %> <%= note %><br><% } %><span class="rv-sale-price"><strong class="<%= walkthroughPrice ? "rv-price-card__current" : "service-price-current" %>"><span class="sr-only">Sale price </span><%= saleAmount %></strong><span class="grand-opening-mini">Grand<br>Opening</span></span><% if (!walkthroughPrice) { %></span><% } %>
