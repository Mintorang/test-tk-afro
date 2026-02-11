'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import Image from 'next/image';

interface SizeOption {
  size: string;
  price: number;
  portionInfo: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  price?: number; // legacy single-price
  sizeOptions?: SizeOption[]; // new multi-size support
}

export default function MenuItemEditor() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('admin_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  };

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('/api/admin/menu-items', {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        setMenuItems(data);
      } else if (response.status === 401) {
        window.location.href = '/admin';
      }
    } catch (error) {
      console.error('Failed to fetch menu items:', error);
    }
  };

  const handleCreateNew = () => {
    const newItem: MenuItem = {
      id: `new-${Date.now()}`,
      name: '',
      description: '',
      imageUrl: '',
      category: '',
      price: 0,
      sizeOptions: [],
    };
    setSelectedItem(newItem);
    setIsEditing(true);
  };

  const handleEdit = (item: MenuItem) => {
    // Ensure sizeOptions exists (backwards compatibility)
    const itemCopy: MenuItem = {
      ...item,
      sizeOptions: item.sizeOptions ? [...item.sizeOptions] : (item.price ? [{ size: 'default', price: item.price, portionInfo: '' }] : []),
    };
    setSelectedItem(itemCopy);
    setIsEditing(true);
  };

  const handleAddSizeOption = () => {
    if (!selectedItem) return;
    const next: MenuItem = { 
      ...selectedItem,
      sizeOptions: [...(selectedItem.sizeOptions || []), { size: '', price: 0, portionInfo: '' }]
    };
    setSelectedItem(next);
  };

  const handleRemoveSizeOption = (index: number) => {
    if (!selectedItem || !selectedItem.sizeOptions) return;
    const next: MenuItem = { 
      ...selectedItem,
      sizeOptions: selectedItem.sizeOptions.filter((_, i) => i !== index)
    };
    setSelectedItem(next);
  };

  const handleSizeOptionChange = (index: number, key: keyof SizeOption, value: any) => {
    if (!selectedItem || !selectedItem.sizeOptions) return;
    const next: MenuItem = { 
      ...selectedItem,
      sizeOptions: selectedItem.sizeOptions.map((opt, i) => i === index ? { ...opt, [key]: key === 'price' ? Number(value) : value } : opt)
    };
    setSelectedItem(next);
  };

  const handleSave = async () => {
    if (!selectedItem) return;

    setIsLoading(true);
    try {
      const isNew = selectedItem.id.startsWith('new-');
      const url = isNew ? '/api/admin/menu-items' : `/api/admin/menu-items/${selectedItem.id}`;
      const method = isNew ? 'POST' : 'PUT';

      // If sizeOptions has exactly one entry with size === 'default', convert to legacy price for backwards compatibility
      let payload: any = { ...selectedItem };
      if (payload.sizeOptions && payload.sizeOptions.length === 1 && payload.sizeOptions[0].size === 'default') {
        payload.price = payload.sizeOptions[0].price;
        // keep sizeOptions if desired; the backend should accept both
      }

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        await fetchMenuItems();
        setIsEditing(false);
        setSelectedItem(null);
      } else if (response.status === 401) {
        window.location.href = '/admin';
      } else {
        throw new Error('Failed to save menu item');
      }
    } catch (error) {
      console.error('Error saving menu item:', error);
      alert('Failed to save menu item. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;

    try {
      const response = await fetch(`/api/admin/menu-items/${itemId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        await fetchMenuItems();
      } else if (response.status === 401) {
        window.location.href = '/admin';
      } else {
        throw new Error('Failed to delete menu item');
      }
    } catch (error) {
      console.error('Error deleting menu item:', error);
      alert('Failed to delete menu item.');
    }
  };

  const filtered = menuItems.filter(mi => mi.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Menu Management</h2>
        <div className="flex items-center gap-3">
          <input className="input" placeholder="Search menu..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <Button onClick={handleCreateNew} className="flex items-center gap-2"><Plus /> Add New</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(item => (
          <Card key={item.id}>
            <CardContent className="flex items-center gap-4">
              <div className="w-20 h-20 relative rounded overflow-hidden bg-gray-800">
                {item.imageUrl ? <Image src={item.imageUrl} alt={item.name} fill className="object-cover" /> : <div className="flex items-center justify-center h-full text-xs text-gray-400">No Image</div>}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-slate-400">{item.category}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-sm font-medium">{item.sizeOptions && item.sizeOptions.length > 0 ? `Sizes: ${item.sizeOptions.length}` : (typeof item.price === 'number' ? `£${item.price.toFixed(2)}` : '—')}</div>
                    <div className="flex gap-2">
                      <Button variant="ghost" onClick={() => handleEdit(item)}><Edit /></Button>
                      <Button variant="ghost" onClick={() => handleDelete(item.id)}><Trash2 /></Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Editor Drawer / Modal */}
      {isEditing && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => { setIsEditing(false); setSelectedItem(null); }} />
          <div className="relative bg-[#0f1724] w-full sm:max-w-3xl rounded-t-xl sm:rounded-xl p-6 m-4 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{selectedItem.id.startsWith('new-') ? 'Create new item' : 'Edit item'}</h3>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => { setIsEditing(false); setSelectedItem(null); }}><X /></Button>
                <Button onClick={handleSave} disabled={isLoading}><Save /> {isLoading ? 'Saving...' : 'Save'}</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input value={selectedItem.name} onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })} />

                <Label className="mt-4">Category</Label>
                <Input value={selectedItem.category} onChange={(e) => setSelectedItem({ ...selectedItem, category: e.target.value })} />

                <Label className="mt-4">Description</Label>
                <Textarea value={selectedItem.description} onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })} />

                <Label className="mt-4">Legacy Price (optional)</Label>
                <Input type="number" value={selectedItem.price ?? 0} onChange={(e) => setSelectedItem({ ...selectedItem, price: Number(e.target.value) })} />

                <Label className="mt-4">Image URL</Label>
                <div className="flex items-center gap-2">
                  <Input value={selectedItem.imageUrl} onChange={(e) => setSelectedItem({ ...selectedItem, imageUrl: e.target.value })} />
                  <Button variant="ghost" onClick={() => alert('Image upload not implemented in this PR') }><ImageIcon /></Button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label>Size Options</Label>
                  <Button onClick={handleAddSizeOption} className="flex items-center gap-2"><Plus /> Add Size</Button>
                </div>

                <div className="space-y-3 mt-3">
                  {(selectedItem.sizeOptions && selectedItem.sizeOptions.length > 0) ? selectedItem.sizeOptions.map((opt, i) => (
                    <div key={i} className="p-3 border rounded-lg bg-[#071122]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium">Option {i + 1}</div>
                        <Button variant="ghost" onClick={() => handleRemoveSizeOption(i)}><Trash2 /></Button>
                      </div>

                      <Label>Size (e.g. 2L, 4L, half-cooler)</Label>
                      <Input value={opt.size} onChange={(e) => handleSizeOptionChange(i, 'size', e.target.value)} />

                      <Label className="mt-2">Portion Info</Label>
                      <Input value={opt.portionInfo} onChange={(e) => handleSizeOptionChange(i, 'portionInfo', e.target.value)} />

                      <Label className="mt-2">Price (£)</Label>
                      <Input type="number" value={opt.price} onChange={(e) => handleSizeOptionChange(i, 'price', e.target.value)} />
                    </div>
                  )) : <div className="text-sm text-slate-400">No size options. Use legacy price field for single-price items or add size options here.</div>}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => { setIsEditing(false); setSelectedItem(null); }}>Cancel</Button>
              <Button onClick={handleSave} disabled={isLoading}><Save /> {isLoading ? 'Saving...' : 'Save Item'}</Button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
