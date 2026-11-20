<%@ tag pageEncoding="UTF-8" body-content="empty" %>
<%@ tag import="java.io.BufferedReader,java.io.InputStream,java.io.InputStreamReader,java.nio.charset.StandardCharsets,java.util.ArrayList,java.util.List" %>
<%!
  private String escapeTopic(String value) {
    return value.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
        .replace("\"", "&quot;").replace("'", "&#39;");
  }
%>
<%
  // Single source: unindented lines are groups; indented lines are topics.
  List<String> headings = new ArrayList<>();
  List<List<String>> groups = new ArrayList<>();
  InputStream stream = application.getResourceAsStream("/assets/walkthru_topics.txt");
  if (stream == null) {
    throw new java.io.FileNotFoundException("/assets/walkthru_topics.txt");
  }
  try (BufferedReader reader = new BufferedReader(new InputStreamReader(stream, StandardCharsets.UTF_8))) {
    String line;
    while ((line = reader.readLine()) != null) {
      line = line.replace("\uFEFF", "");
      if (line.isBlank()) continue;
      if (!Character.isWhitespace(line.charAt(0))) {
        headings.add(line.trim());
        groups.add(new ArrayList<>());
      } else {
        if (groups.isEmpty()) throw new java.io.IOException("A walkthrough topic must follow a group heading.");
        groups.get(groups.size() - 1).add(line.trim());
      }
    }
  }
  for (int i = 0; i < headings.size(); i++) {
%>
<details class="walkthrough-topic" id="walkthrough-group-<%= i + 1 %>">
  <summary><span class="walkthrough-topic-number" aria-hidden="true"><%= String.format("%02d", i + 1) %></span><span><%= escapeTopic(headings.get(i)) %></span></summary>
  <ul>
  <% for (String topic : groups.get(i)) { %>
    <li><%= escapeTopic(topic) %></li>
  <% } %>
  </ul>
</details>
<% } %>
