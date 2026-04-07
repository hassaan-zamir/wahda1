/**
 * Unit tests for Admin Server Actions — Properties, Blogs, Portfolio, Leads
 *
 * These tests mock Prisma and next/cache to verify action logic in isolation.
 */

// Mock Prisma before any imports
jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: require("@/__mocks__/prisma").default,
}));

// Mock next/cache revalidatePath
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

import mockPrisma from "@/__mocks__/prisma";
import { revalidatePath } from "next/cache";

// ─── Property Actions ────────────────────────────────────────
describe("Property Server Actions", () => {
  beforeEach(() => jest.clearAllMocks());

  const loadActions = () =>
    require("@/app/admin/properties/actions") as typeof import("@/app/admin/properties/actions");

  test("deleteProperty — success path", async () => {
    mockPrisma.property.delete.mockResolvedValue({ id: "p1" });

    const { deleteProperty } = loadActions();
    const result = await deleteProperty("p1");

    expect(mockPrisma.property.delete).toHaveBeenCalledWith({ where: { id: "p1" } });
    expect(revalidatePath).toHaveBeenCalledWith("/admin/properties");
    expect(result).toEqual({ success: true });
  });

  test("deleteProperty — failure path", async () => {
    mockPrisma.property.delete.mockRejectedValue(new Error("DB error"));

    const { deleteProperty } = loadActions();
    const result = await deleteProperty("invalid-id");

    expect(result).toEqual({ success: false, error: "Failed to delete property" });
  });

  test("createProperty — success path", async () => {
    const mockCreated = { id: "p2", title: "Dream Villa", slug: "dream-villa" };
    mockPrisma.property.create.mockResolvedValue(mockCreated);

    const { createProperty } = loadActions();
    const result = await createProperty({
      title: "Dream Villa",
      slug: "dream-villa",
      description: "A stunning villa",
      price: "$1,500,000",
      status: "Available",
      location: "Dubai Marina",
      bedrooms: "4",
      bathrooms: "3",
      sqft: "5000",
      images: "img1.jpg, img2.jpg",
      amenities: "Pool, Gym",
      featured: "on",
    });

    expect(mockPrisma.property.create).toHaveBeenCalledTimes(1);
    const createCall = mockPrisma.property.create.mock.calls[0][0];
    expect(createCall.data.title).toBe("Dream Villa");
    expect(createCall.data.price).toBe("$1,500,000");
    expect(createCall.data.bedrooms).toBe(4);
    expect(createCall.data.sqft).toBe(5000);
    expect(createCall.data.images).toEqual(["img1.jpg", "img2.jpg"]);
    expect(createCall.data.amenities).toEqual(["Pool", "Gym"]);
    expect(createCall.data.featured).toBe(true);
    expect(result.success).toBe(true);
    expect(result.property).toEqual(mockCreated);
  });

  test("createProperty — failure path", async () => {
    mockPrisma.property.create.mockRejectedValue(new Error("Unique constraint"));

    const { createProperty } = loadActions();
    const result = await createProperty({ title: "Bad Data" });

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});

// ─── Blog Actions ────────────────────────────────────────────
describe("Blog Server Actions", () => {
  beforeEach(() => jest.clearAllMocks());

  const loadActions = () =>
    require("@/app/admin/blogs/actions") as typeof import("@/app/admin/blogs/actions");

  test("deleteBlog — success path", async () => {
    mockPrisma.blog.delete.mockResolvedValue({ id: "b1" });

    const { deleteBlog } = loadActions();
    const result = await deleteBlog("b1");

    expect(mockPrisma.blog.delete).toHaveBeenCalledWith({ where: { id: "b1" } });
    expect(revalidatePath).toHaveBeenCalledWith("/admin/blogs");
    expect(result).toEqual({ success: true });
  });

  test("deleteBlog — failure path", async () => {
    mockPrisma.blog.delete.mockRejectedValue(new Error("Not found"));

    const { deleteBlog } = loadActions();
    const result = await deleteBlog("invalid-id");

    expect(result).toEqual({ success: false, error: "Failed to delete blog" });
  });

  test("createBlog — success path", async () => {
    const mockCreated = { id: "b2", title: "Test Blog" };
    mockPrisma.blog.create.mockResolvedValue(mockCreated);

    const { createBlog } = loadActions();
    const result = await createBlog({
      title: "Test Blog",
      slug: "test-blog",
      content: "Some content here",
      author: "Admin",
      category: "Architecture",
      coverImage: "cover.jpg",
      published: "on",
    });

    expect(mockPrisma.blog.create).toHaveBeenCalledTimes(1);
    const createCall = mockPrisma.blog.create.mock.calls[0][0];
    expect(createCall.data.title).toBe("Test Blog");
    expect(createCall.data.category).toBe("Architecture");
    expect(createCall.data.published).toBe(true);
    expect(result.success).toBe(true);
  });
});

// ─── Portfolio Actions ───────────────────────────────────────
describe("Portfolio Server Actions", () => {
  beforeEach(() => jest.clearAllMocks());

  const loadActions = () =>
    require("@/app/admin/portfolio/actions") as typeof import("@/app/admin/portfolio/actions");

  test("deletePortfolio — success path", async () => {
    mockPrisma.portfolio.delete.mockResolvedValue({ id: "pf1" });

    const { deletePortfolio } = loadActions();
    const result = await deletePortfolio("pf1");

    expect(mockPrisma.portfolio.delete).toHaveBeenCalledWith({ where: { id: "pf1" } });
    expect(revalidatePath).toHaveBeenCalledWith("/admin/portfolio");
    expect(result).toEqual({ success: true });
  });

  test("deletePortfolio — failure path", async () => {
    mockPrisma.portfolio.delete.mockRejectedValue(new Error("Not found"));

    const { deletePortfolio } = loadActions();
    const result = await deletePortfolio("invalid-id");

    expect(result).toEqual({ success: false, error: "Failed to delete portfolio item" });
  });

  test("createPortfolio — success with images", async () => {
    const mockCreated = { id: "pf2", title: "Skyline Tower" };
    mockPrisma.portfolio.create.mockResolvedValue(mockCreated);

    const { createPortfolio } = loadActions();
    const result = await createPortfolio({
      title: "Skyline Tower",
      slug: "skyline-tower",
      description: "A landmark project",
      location: "Abu Dhabi",
      images: "g1.jpg, g2.jpg, g3.jpg",
      completion: "2024",
    });

    const createCall = mockPrisma.portfolio.create.mock.calls[0][0];
    expect(createCall.data.title).toBe("Skyline Tower");
    expect(createCall.data.images).toEqual(["g1.jpg", "g2.jpg", "g3.jpg"]);
    expect(createCall.data.completion).toBe("2024");
    expect(result.success).toBe(true);
  });
});

// ─── Lead Actions ────────────────────────────────────────────
describe("Lead Server Actions", () => {
  beforeEach(() => jest.clearAllMocks());

  const loadActions = () =>
    require("@/app/admin/leads/actions") as typeof import("@/app/admin/leads/actions");

  test("deleteLead — success path", async () => {
    mockPrisma.lead.delete.mockResolvedValue({ id: "l1" });

    const { deleteLead } = loadActions();
    const result = await deleteLead("l1");

    expect(mockPrisma.lead.delete).toHaveBeenCalledWith({ where: { id: "l1" } });
    expect(revalidatePath).toHaveBeenCalledWith("/admin/leads");
    expect(result).toEqual({ success: true });
  });

  test("deleteLead — failure path", async () => {
    mockPrisma.lead.delete.mockRejectedValue(new Error("DB err"));

    const { deleteLead } = loadActions();
    const result = await deleteLead("invalid-id");

    expect(result).toEqual({ success: false, error: "Failed to delete lead" });
  });
});

// ─── Frontend Inquiry Action ─────────────────────────────────
describe("Submit Inquiry (Frontend)", () => {
  beforeEach(() => jest.clearAllMocks());

  const loadActions = () =>
    require("@/app/(main)/actions") as typeof import("@/app/(main)/actions");

  test("submitInquiry — success path", async () => {
    mockPrisma.lead.create.mockResolvedValue({ id: "l2" });

    const { submitInquiry } = loadActions();
    const result = await submitInquiry({
      name: "John Doe",
      email: "john@example.com",
      phone: "+971501234567",
      message: "Interested in the penthouse",
    });

    expect(mockPrisma.lead.create).toHaveBeenCalledTimes(1);
    const createCall = mockPrisma.lead.create.mock.calls[0][0];
    expect(createCall.data.name).toBe("John Doe");
    expect(createCall.data.email).toBe("john@example.com");
    expect(createCall.data.status).toBe("New");
    expect(result).toEqual({ success: true });
  });

  test("submitInquiry — failure path", async () => {
    mockPrisma.lead.create.mockRejectedValue(new Error("DB error"));

    const { submitInquiry } = loadActions();
    const result = await submitInquiry({ name: "John", email: "bad" });

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
