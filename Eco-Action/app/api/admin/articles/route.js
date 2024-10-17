import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import Article from "../../../../models/Article";

export async function GET(req) {
  await dbConnect();

  try {
    // Query to fetch articles that are not soft-deleted
    const articles = await Article.find({ isDeleted: false });
    return new Response(JSON.stringify(articles), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch articles" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function POST(req) {
  try {
    await dbConnect();

    const data = await req.json();

    // Validate required fields
    if (!data.title || !data.description || !data.category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create new article document with proper media structure
    const article = new Article({
      title: data.title,
      description: data.description,
      category: data.category,
      media: {
        photos: data.media?.photos || [],
        videos: data.media?.videos || [],
      },
      isDeleted: false,
    });

    const savedArticle = await article.save();
    return NextResponse.json(savedArticle, { status: 201 });
  } catch (error) {
    console.error("Article creation error:", error);
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await dbConnect();

    const data = await req.json();

    if (!data._id) {
      return NextResponse.json(
        { error: "Article ID is required" },
        { status: 400 }
      );
    }

    const updateData = {
      title: data.title,
      description: data.description,
      category: data.category,
      media: {
        photos: data.media?.photos || [],
        videos: data.media?.videos || [],
      },
    };

    const updatedArticle = await Article.findByIdAndUpdate(
      data._id,
      updateData,
      { new: true }
    );

    if (!updatedArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error("Article update error:", error);
    return NextResponse.json(
      { error: "Failed to update article" },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { id } = body; // Expecting the ID of the article to be passed in the request body

    // Find the article by ID
    const article = await Article.findById(id);
    if (!article) {
      return new Response(JSON.stringify({ error: "Article not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Set the isDeleted flag to true
    article.isDeleted = true;

    // Save the updated article
    await article.save();

    return new Response(
      JSON.stringify({ message: "Article soft-deleted successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete article" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

// import { NextResponse } from "next/server";
// import dbConnect from "../../../../lib/mongodb";
// import Article from "../../../../models/Article";

// export async function GET(req) {
//   await dbConnect();
//   try {
//     const articles = await Article.find({ isDeleted: false });
//     return new Response(JSON.stringify(articles), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Failed to fetch articles" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

// export async function POST(req) {
//   try {
//     await dbConnect();
//     const body = await req.json();
//     const { title, description, category, media } = body;

//     if (!title || !description || !category) {
//       return NextResponse.json(
//         { message: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Create a new article with media (photos and videos)
//     const newArticle = new Article({
//       title,
//       description,
//       category,
//       media: {
//         photos: media.photos || [],
//         videos: media.videos || [],
//       },
//     });

//     await newArticle.save();

//     return NextResponse.json(
//       { message: "Article created successfully", article: newArticle },
//       { status: 201 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Error creating article", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(req, { params }) {
//   await dbConnect();
//   const { id } = params;
//   try {
//     const result = await Article.findByIdAndUpdate(id, { isDeleted: true });
//     if (!result) {
//       return NextResponse.json(
//         { message: "Article not found" },
//         { status: 404 }
//       );
//     }
//     return NextResponse.json(
//       { message: "Article soft deleted", result },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Server error", error },
//       { status: 500 }
//     );
//   }
// }

// export async function PATCH(req) {
//   await dbConnect();
//   try {
//     const body = await req.json();
//     const { id } = body;
//     const article = await Article.findById(id);
//     if (!article) {
//       return new Response(JSON.stringify({ error: "Article not found" }), {
//         status: 404,
//         headers: { "Content-Type": "application/json" },
//       });
//     }
//     article.isDeleted = true;
//     await article.save();
//     return new Response(
//       JSON.stringify({ message: "Article soft-deleted successfully" }),
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Failed to delete article" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

// the code up is correct

// import { NextResponse } from "next/server";
// import dbConnect from "../../../../lib/mongodb";
// import Article from "../../../../models/Article";

// export async function GET(req) {
//   await dbConnect();
//   try {
//     const articles = await Article.find({ isDeleted: false });
//     return new Response(JSON.stringify(articles), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Failed to fetch articles" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

// export async function POST(req) {
//   try {
//     await dbConnect();
//     const body = await req.json();
//     const { title, description, category, media } = body;

//     if (!title || !description || !category) {
//       return NextResponse.json(
//         { message: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Create a new article with media (photos and videos)
//     const newArticle = new Article({
//       title,
//       description,
//       category,
//       media: {
//         photos: media.photos || [],
//         videos: media.videos || [],
//       },
//     });

//     await newArticle.save();

//     return NextResponse.json(
//       { message: "Article created successfully", article: newArticle },
//       { status: 201 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Error creating article", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(req) {
//   await dbConnect();
//   try {
//     const body = await req.json();
//     const { id, title, description, category, media } = body;

//     const updatedArticle = await Article.findByIdAndUpdate(
//       id,
//       {
//         title,
//         description,
//         category,
//         media: {
//           photos: media.photos || [],
//           videos: media.videos || [],
//         },
//       },
//       { new: true }
//     );

//     if (!updatedArticle) {
//       return NextResponse.json(
//         { message: "Article not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { message: "Article updated successfully", article: updatedArticle },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Error updating article", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function PATCH(req) {
//   await dbConnect();
//   try {
//     const body = await req.json();
//     const { id } = body;
//     const article = await Article.findById(id);
//     if (!article) {
//       return new Response(JSON.stringify({ error: "Article not found" }), {
//         status: 404,
//         headers: { "Content-Type": "application/json" },
//       });
//     }
//     article.isDeleted = true;
//     await article.save();
//     return new Response(
//       JSON.stringify({ message: "Article soft-deleted successfully" }),
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Failed to delete article" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

// import { NextResponse } from "next/server";
// import dbConnect from "../../../../lib/mongodb";
// import Article from "../../../../models/Article";

// export async function GET(req) {
//   await dbConnect();
//   try {
//     // Query to fetch articles that are not soft-deleted
//     const articles = await Article.find({ isDeleted: false });
//     return new Response(JSON.stringify(articles), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Failed to fetch articles" }), {
//       status: 500,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }
// }

// export async function POST(req) {
//   try {
//     await dbConnect();
//     const articleData = await req.json();

//     const newArticle = new Article(articleData);
//     await newArticle.save();

//     return NextResponse.json(newArticle, { status: 201 });
//   } catch (error) {
//     console.error("Error creating article:", error);
//     return NextResponse.json(
//       { error: "Failed to create article" },
//       { status: 500 }
//     );
//   }
// }
// export async function PUT(req, { params }) {
//   await dbConnect();
//   const { id } = params;
//   try {
//     // Soft delete by setting isDeleted to true
//     const result = await Article.findByIdAndUpdate(id, { isDeleted: true });
//     if (!result) {
//       return NextResponse.json(
//         { message: "Article not found" },
//         { status: 404 }
//       );
//     }
//     return NextResponse.json(
//       { message: "Article soft deleted", result },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Server error", error },
//       { status: 500 }
//     );
//   }
// }

// export async function PATCH(req) {
//   await dbConnect();
//   try {
//     const body = await req.json();
//     const { id } = body; // Expecting the ID of the article to be passed in the request body

//     // Find the article by ID
//     const article = await Article.findById(id);
//     if (!article) {
//       return new Response(JSON.stringify({ error: "Article not found" }), {
//         status: 404,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//     }

//     // Set the isDeleted flag to true
//     article.isDeleted = true;

//     // Save the updated article
//     await article.save();

//     return new Response(
//       JSON.stringify({ message: "Article soft-deleted successfully" }),
//       {
//         status: 200,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Failed to delete article" }), {
//       status: 500,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }
// }
