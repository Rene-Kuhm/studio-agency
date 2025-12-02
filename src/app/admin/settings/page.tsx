'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin';

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  socialFacebook: string;
  socialTwitter: string;
  socialInstagram: string;
  socialLinkedin: string;
  socialGithub: string;
  analyticsId: string;
  maintenanceMode: boolean;
}

const defaultSettings: SiteSettings = {
  siteName: 'TecnoDespegue',
  siteDescription: 'Agencia Digital - Soluciones web innovadoras',
  siteUrl: 'https://tecnodespegue.com',
  contactEmail: 'info@tecnodespegue.com',
  contactPhone: '+54 2334 409-838',
  contactAddress: 'Eduardo Castex, La Pampa, Argentina',
  socialFacebook: '',
  socialTwitter: '',
  socialInstagram: '',
  socialLinkedin: '',
  socialGithub: 'https://github.com/Rene-Kuhm',
  analyticsId: '',
  maintenanceMode: false,
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'social' | 'advanced'>('general');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings({ ...defaultSettings, ...data.settings });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setSuccessMessage('Configuracion guardada correctamente');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const data = await res.json();
        setError(data.error || 'Error al guardar');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setError('Error de conexion');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: keyof SiteSettings, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const tabs = [
    { id: 'general' as const, label: 'General', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )},
    { id: 'contact' as const, label: 'Contacto', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )},
    { id: 'social' as const, label: 'Redes Sociales', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )},
    { id: 'advanced' as const, label: 'Avanzado', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    )},
  ];

  const inputClasses = "w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition-all";
  const labelClasses = "block text-sm font-medium mb-2";

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Configuracion</h1>
          <p className="text-muted-foreground mt-1">Ajustes generales del sitio</p>
        </div>

        {/* Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500"
          >
            {error}
          </motion.div>
        )}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500"
          >
            {successMessage}
          </motion.div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Tabs */}
            <div className="lg:col-span-1">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left
                      ${activeTab === tab.id
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                      }
                    `}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit}>
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-secondary/30 rounded-2xl border border-border p-6"
                >
                  {/* General Tab */}
                  {activeTab === 'general' && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold mb-6">Configuracion General</h2>

                      <div>
                        <label className={labelClasses}>Nombre del Sitio</label>
                        <input
                          type="text"
                          value={settings.siteName}
                          onChange={(e) => handleChange('siteName', e.target.value)}
                          className={inputClasses}
                          placeholder="TecnoDespegue"
                        />
                      </div>

                      <div>
                        <label className={labelClasses}>Descripcion</label>
                        <textarea
                          value={settings.siteDescription}
                          onChange={(e) => handleChange('siteDescription', e.target.value)}
                          className={`${inputClasses} min-h-[100px] resize-none`}
                          placeholder="Descripcion del sitio..."
                        />
                      </div>

                      <div>
                        <label className={labelClasses}>URL del Sitio</label>
                        <input
                          type="url"
                          value={settings.siteUrl}
                          onChange={(e) => handleChange('siteUrl', e.target.value)}
                          className={inputClasses}
                          placeholder="https://tecnodespegue.com"
                        />
                      </div>
                    </div>
                  )}

                  {/* Contact Tab */}
                  {activeTab === 'contact' && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold mb-6">Informacion de Contacto</h2>

                      <div>
                        <label className={labelClasses}>Email de Contacto</label>
                        <input
                          type="email"
                          value={settings.contactEmail}
                          onChange={(e) => handleChange('contactEmail', e.target.value)}
                          className={inputClasses}
                          placeholder="info@tecnodespegue.com"
                        />
                      </div>

                      <div>
                        <label className={labelClasses}>Telefono</label>
                        <input
                          type="tel"
                          value={settings.contactPhone}
                          onChange={(e) => handleChange('contactPhone', e.target.value)}
                          className={inputClasses}
                          placeholder="+54 2334 409-838"
                        />
                      </div>

                      <div>
                        <label className={labelClasses}>Direccion</label>
                        <textarea
                          value={settings.contactAddress}
                          onChange={(e) => handleChange('contactAddress', e.target.value)}
                          className={`${inputClasses} min-h-[80px] resize-none`}
                          placeholder="Eduardo Castex, La Pampa, Argentina"
                        />
                      </div>
                    </div>
                  )}

                  {/* Social Tab */}
                  {activeTab === 'social' && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold mb-6">Redes Sociales</h2>

                      <div>
                        <label className={labelClasses}>Facebook</label>
                        <input
                          type="url"
                          value={settings.socialFacebook}
                          onChange={(e) => handleChange('socialFacebook', e.target.value)}
                          className={inputClasses}
                          placeholder="https://facebook.com/tecnodespegue"
                        />
                      </div>

                      <div>
                        <label className={labelClasses}>Twitter / X</label>
                        <input
                          type="url"
                          value={settings.socialTwitter}
                          onChange={(e) => handleChange('socialTwitter', e.target.value)}
                          className={inputClasses}
                          placeholder="https://twitter.com/tecnodespegue"
                        />
                      </div>

                      <div>
                        <label className={labelClasses}>Instagram</label>
                        <input
                          type="url"
                          value={settings.socialInstagram}
                          onChange={(e) => handleChange('socialInstagram', e.target.value)}
                          className={inputClasses}
                          placeholder="https://instagram.com/tecnodespegue"
                        />
                      </div>

                      <div>
                        <label className={labelClasses}>LinkedIn</label>
                        <input
                          type="url"
                          value={settings.socialLinkedin}
                          onChange={(e) => handleChange('socialLinkedin', e.target.value)}
                          className={inputClasses}
                          placeholder="https://linkedin.com/company/tecnodespegue"
                        />
                      </div>

                      <div>
                        <label className={labelClasses}>GitHub</label>
                        <input
                          type="url"
                          value={settings.socialGithub}
                          onChange={(e) => handleChange('socialGithub', e.target.value)}
                          className={inputClasses}
                          placeholder="https://github.com/tecnodespegue"
                        />
                      </div>
                    </div>
                  )}

                  {/* Advanced Tab */}
                  {activeTab === 'advanced' && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold mb-6">Configuracion Avanzada</h2>

                      <div>
                        <label className={labelClasses}>Google Analytics ID</label>
                        <input
                          type="text"
                          value={settings.analyticsId}
                          onChange={(e) => handleChange('analyticsId', e.target.value)}
                          className={inputClasses}
                          placeholder="G-XXXXXXXXXX"
                        />
                        <p className="text-sm text-muted-foreground mt-2">
                          ID de medicion de Google Analytics 4
                        </p>
                      </div>

                      <div className="pt-4 border-t border-border">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Modo Mantenimiento</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Muestra una pagina de mantenimiento a los visitantes
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleChange('maintenanceMode', !settings.maintenanceMode)}
                            className={`
                              relative w-14 h-8 rounded-full transition-colors
                              ${settings.maintenanceMode ? 'bg-accent' : 'bg-secondary'}
                            `}
                          >
                            <span
                              className={`
                                absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform
                                ${settings.maintenanceMode ? 'translate-x-7' : 'translate-x-1'}
                              `}
                            />
                          </button>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-border">
                        <h3 className="font-medium mb-4 text-red-500">Zona de Peligro</h3>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm('¿Estas seguro de restablecer la configuracion?')) {
                              setSettings(defaultSettings);
                              setSuccessMessage('Configuracion restablecida');
                              setTimeout(() => setSuccessMessage(''), 3000);
                            }
                          }}
                          className="px-4 py-2 bg-red-500/10 text-red-500 rounded-xl font-medium hover:bg-red-500/20 transition-colors"
                        >
                          Restablecer valores predeterminados
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Save Button */}
                  <div className="mt-8 pt-6 border-t border-border flex justify-end">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-6 py-3 bg-accent text-accent-foreground rounded-xl font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
                    >
                      {isSaving ? (
                        <span className="flex items-center gap-2">
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Guardando...
                        </span>
                      ) : (
                        'Guardar cambios'
                      )}
                    </button>
                  </div>
                </motion.div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
