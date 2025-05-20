// // components/society/edit-society-form.tsx
// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { AlertCircle } from 'lucide-react'
// import { getToken } from "@/lib/auth"

// interface Society {
//   societyId: string
//   name: string
//   address: string
//   city?: string
//   state?: string
//   postalCode?: string
// }

// interface EditSocietyFormProps {
//   society: Society
//   onSocietyUpdated: () => void
//   onCancel: () => void
// }

// export function EditSocietyForm({ society, onSocietyUpdated, onCancel }: EditSocietyFormProps) {
//   const [formData, setFormData] = useState({
//     name: society.name,
//     address: society.address,
//     city: society.city || "",
//     state: society.state || "",
//     postalCode: society.postalCode || "",
//   })
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [error, setError] = useState("")

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

// // components/society/edit-society-form.tsx
// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault()
//   setIsSubmitting(true)
//   setError("")

//   try {
//     const token = getToken()
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/society/latest/update`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(formData),
//     })

//     if (!response.ok) {
//       // Check if there's content before trying to parse JSON
//       const text = await response.text();
//       let errorMessage = 'Failed to update society';
      
//       if (text) {
//         try {
//           const errorData = JSON.parse(text);
//           errorMessage = errorData.message || errorMessage;
//         } catch (parseError) {
//           // If JSON parsing fails, use the raw text or a default message
//           errorMessage = text || errorMessage;
//         }
//       }
      
//       throw new Error(errorMessage);
//     }

//     // Check if there's content before trying to parse JSON
//     const text = await response.text();
//     if (text) {
//       // Only try to parse if there's content
//       try {
//         JSON.parse(text);
//       } catch (parseError) {
//         console.warn('Response is not valid JSON, but update may have succeeded');
//       }
//     }

//     onSocietyUpdated();
//   } catch (err) {
//     setError(err instanceof Error ? err.message : "An error occurred during society update");
//   } finally {
//     setIsSubmitting(false);
//   }
// }
//   return (
//     <Card className="w-full max-w-2xl mx-auto">
//       <CardHeader>
//         <CardTitle className="text-xl text-brown-600">Edit Society</CardTitle>
//       </CardHeader>
//       <form onSubmit={handleSubmit}>
//         <CardContent className="space-y-4">
//           {error && (
//             <Alert variant="destructive">
//               <AlertCircle className="h-4 w-4" />
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}

//           <div className="space-y-2">
//             <Label htmlFor="name">Society Name *</Label>
//             <Input
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Green Meadows Residents Association"
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="address">Address *</Label>
//             <Input
//               id="address"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               placeholder="Chak Shahzad, Islamabad"
//               required
//             />
//           </div>

//           <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//             <div className="space-y-2">
//               <Label htmlFor="city">City</Label>
//               <Input id="city" name="city" value={formData.city} onChange={handleChange} placeholder="Islamabad" />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="state">State/Province</Label>
//               <Input id="state" name="state" value={formData.state} onChange={handleChange} placeholder="Punjab" />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="postalCode">Postal Code</Label>
//               <Input
//                 id="postalCode"
//                 name="postalCode"
//                 value={formData.postalCode}
//                 onChange={handleChange}
//                 placeholder="44000"
//               />
//             </div>
//           </div>
//         </CardContent>
//         <CardFooter className="flex justify-end space-x-4">
//           <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
//             Cancel
//           </Button>
//           <Button type="submit" className="bg-brown-600 hover:bg-brown-700" disabled={isSubmitting}>
//             {isSubmitting ? "Updating..." : "Update Society"}
//           </Button>
//         </CardFooter>
//       </form>
//     </Card>
//   )
// }