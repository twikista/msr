import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    authors: [
      {
        name: { type: String, required: true, trim: true },
        department: { type: String, required: true, trim: true },
        institution: { type: String, required: true, trim: true },
      },
    ],
    volume: { type: String, required: true, trim: true },
    issue: { type: String, required: true, trim: true, enum: [1, 2] },
    publishDate: { type: Date },
    startPage: { type: Number, required: true },
    endPage: { type: Number, required: true },
    abstract: { type: String, required: true },
    pdfUrl: { type: String, required: true, unique: true },
    keywords: [{ type: String, required: true }],
    jelClassification: [{ type: String, required: false }],
    slug: { type: String, required: true },
    ref: { type: String, required: true },
    published: { type: Boolean, required: true, default: false },
    // addedBy:{ type: String, required: true},
    // approvedBy:{ type: String, required: true},
  },
  { timestamps: true }
)

//Issue schema
const issueSchema = new mongoose.Schema(
  {
    issueTitle: { type: String, required: true },
    issueNumber: { type: String, required: true, trim: true, enum: [1, 2] },
    issueYear: {
      type: Date,
      required: true,
    },
    volume: { type: String, required: true },
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }], //likely remove
    ref: { type: String, required: true, unique: true },
    // slug: { type: String, required: true },
    published: { type: Boolean, required: true, default: false },
    publishDate: { type: Date },
    status: {
      type: String,
      required: true,
      default: 'draft',
      enum: ['draft', 'published'],
    },

    // mode: {
    //   type: String,
    //   required: true,
    //   default: 'draft',
    //   enum: ['draft', 'final'],
    // },
    initiatedBy: { type: String, required: true, trim: true },
    // approvedBy: { type: String, required: true, trim: true, default: 'N/A' },

    // image: { type: String, default: null },
  },
  { timestamps: true }
)

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true, maxLength: 100 },
    dueDate: { type: Date, required: true },
    content: { type: String, required: true, trim: true },
    ref: { type: String, required: true },
    slug: { type: String, required: true },
    status: {
      type: String,
      required: true,
      default: 'draft',
      enum: ['draft', 'review', 'published'],
    },

    mode: {
      type: String,
      required: true,
      default: 'draft',
      enum: ['draft', 'final'],
    },
    initiatedBy: { type: String, required: true },
    approvedBy: { type: String, required: true, default: 'N/A' },
  },
  { timestamps: true }
)

const editorialBoardSchema = new mongoose.Schema(
  {
    content: { type: String, required: true, trim: true },
    slug: { type: String, required: true, default: 'msr-editorial-board' },
    ref: { type: String, required: true },
    status: {
      type: String,
      required: true,
      default: 'published',
      enum: ['draft', 'review', 'published'],
    },
    mode: {
      type: String,
      required: true,
      default: 'final',
      enum: ['final', 'draft'],
    },
    addedBy: { type: String, required: true, default: 'admin' },
    updatedBy: { type: String, required: true, default: 'N/A' },
    approvedBy: { type: String, required: true, default: 'N/A' },
  },
  { timestamps: true }
)

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, rquired: true },
    lastName: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'system-admin'],
      required: true,
    },
    isAdmin: { type: Boolean, default: false },
    isActivated: { type: Boolean, default: false },
  },
  { timestamps: true }
)

//Models

export const Article =
  mongoose.models?.Article || mongoose.model('Article', articleSchema)
export const Issue =
  mongoose.models?.Issue || mongoose.model('Issue', issueSchema)

export const Announcement =
  mongoose.models?.Announcement ||
  mongoose.model('Announcement', announcementSchema)

export const EditorialBoard =
  mongoose.models?.EditorialBoard ||
  mongoose.model('EditorialBoard', editorialBoardSchema)

export const User = mongoose.models?.User || mongoose.model('User', userSchema)

///(^[a-z]+)(@uniben\.edu|@bijed\.com\.ng)|(^[a-z]+\.[a-z]+)@uniben\.edu$/gm
