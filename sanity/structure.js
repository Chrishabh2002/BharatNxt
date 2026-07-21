import { SINGLETONS } from "./schemas";

const SINGLETON_TYPES = SINGLETONS.map((s) => s.type);

// A deliberately opinionated sidebar. Editors see "Home page", not "homePage",
// and the one-off documents open straight into the form instead of showing a
// list with a single row and a misleading "create new" button.
export const structure = (S) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETONS.map((s) =>
        S.listItem()
          .title(s.title)
          .id(s.type)
          .child(S.document().schemaType(s.type).documentId(s.type).title(s.title))
      ),

      S.divider(),

      S.listItem()
        .title("Services")
        .child(
          S.list()
            .title("Services")
            .items([
              S.listItem()
                .title("All services")
                .child(S.documentTypeList("service").title("All services")),
              S.listItem()
                .title("By category")
                .child(
                  S.documentTypeList("serviceGroup")
                    .title("Categories")
                    .child((groupId) =>
                      S.documentList()
                        .title("Services")
                        .filter('_type == "service" && group._ref == $groupId')
                        .params({ groupId })
                    )
                ),
              S.listItem()
                .title("Edit categories")
                .child(S.documentTypeList("serviceGroup").title("Categories")),
            ])
        ),

      S.documentTypeListItem("post").title("Blog posts"),
      S.documentTypeListItem("faq").title("FAQs"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("portfolioItem").title("Portfolio"),
      S.documentTypeListItem("partner").title("Partners"),
    ]);

// Singletons must not be duplicated or deleted — hide those actions.
export const documentActions = (prev, { schemaType }) =>
  SINGLETON_TYPES.includes(schemaType)
    ? prev.filter(({ action }) => !["unpublish", "delete", "duplicate"].includes(action))
    : prev;

// ...and they must not be creatable from the global "+" menu either.
export const newDocumentOptions = (prev) =>
  prev.filter((item) => !SINGLETON_TYPES.includes(item.templateId));
