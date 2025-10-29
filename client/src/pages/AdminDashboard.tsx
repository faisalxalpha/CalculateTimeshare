
import { Link } from "wouter";

export function AdminDashboard() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/admin/blog">
          <a className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Blog Admin</h5>
            <p className="font-normal text-gray-700">Manage your blog posts.</p>
          </a>
        </Link>
        <Link href="/admin/settings">
          <a className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Settings</h5>
            <p className="font-normal text-gray-700">Manage your application settings.</p>
          </a>
        </Link>
        <Link href="/admin/icon-settings">
          <a className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Icon Settings</h5>
            <p className="font-normal text-gray-700">Change the website icon.</p>
          </a>
        </Link>
        <Link href="/admin/seo-settings">
          <a className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">SEO Settings</h5>
            <p className="font-normal text-gray-700">Manage your website SEO.</p>
          </a>
        </Link>
        <Link href="/admin/social-media-settings">
          <a className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Social Media Settings</h5>
            <p className="font-normal text-gray-700">Manage your website social media links.</p>
          </a>
        </Link>
      </div>
    </div>
  );
}
