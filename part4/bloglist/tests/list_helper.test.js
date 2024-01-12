import {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} from "../utils/list_helper.js";

describe("Test dummy(anything) === 1", () => {
  test("dummy function on empty array is 1", () => {
    const result = dummy([]);
    expect(result).toBe(1);
  });
  test("dummy function on non-empty array is 1", () => {
    const result = dummy([{}, { title: "some title", lieks: 112 }]);
    expect(result).toBe(1);
  });
});

describe("Test totalLikes function", () => {
  test("totalLikes on empty array returns 0", () => {
    const result = totalLikes([]);
    expect(result).toBe(0);
  });
  test("totalLikes ignores posts with undefined likes", () => {
    const result2 = totalLikes([{ likes: 5, asd: 4 }, { b: 5 }, { likes: 2 }]);
    expect(result2).toBe(7);
  });
});

describe("Test favoriteBlog", () => {
  test("favoriteBlog on empty array returns null", () => {
    const result = favoriteBlog([]);
    expect(result).toBe(null);
  });
  test("favoriteBlog returns post with most likes", () => {
    const result2 = favoriteBlog([
      { b: 5 },
      { likes: 5, asd: 4 },
      { likes: 2 },
    ]);
    expect(result2).toEqual({ likes: 5, asd: 4 });
  });
});

describe("Test mostBlogs", () => {
  test("mostBlogs on empty array returns null", () => {
    const result = mostBlogs([]);
    expect(result).toBe(null);
  });
  test("mostBlogs returns author with highest number of posts", () => {
    const result2 = mostBlogs([
      { author: "a", b: 5, likes: 3 },
      { author: "a", likes: 5, asd: 4 },
      { author: "b", likes: 2 },
    ]);
    expect(result2).toEqual({ author: "a", blogs: 2 });
  });
});

describe("Test mostLikes", () => {
  test("mostLikes on empty array returns null", () => {
    const result = mostLikes([]);
    expect(result).toBe(null);
  });
  test("mostLikes returns author with most total likes", () => {
    const result2 = mostLikes([
      { author: "a", b: 5, likes: 3 },
      { author: "a", likes: 5, asd: 4 },
      { author: "b", likes: 2 },
    ]);
    expect(result2).toEqual({ author: "a", likes: 8 });
  });
});
